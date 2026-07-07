import json
import re
import os

screens = ['events', 'home', 'notices', 'my_profile']

def style_to_react(style_str):
    if not style_str: return "{}"
    styles = []
    for part in style_str.split(';'):
        if ':' in part:
            k, v = part.split(':', 1)
            k = k.strip()
            v = v.strip()
            # camelCase the key
            parts = k.split('-')
            k_camel = parts[0] + ''.join(x.title() for x in parts[1:])
            # Handle font-variation-settings
            if k == 'font-variation-settings':
                # v might have single quotes, e.g. 'FILL' 1
                v = f'"{v}"'
            else:
                v = f'"{v}"'
            styles.append(f"{k_camel}: {v}")
    return "{{ " + ", ".join(styles) + " }}"

def convert_html_to_jsx(html):
    # Extract body content
    body_match = re.search(r'<body[^>]*>(.*?)</body>', html, re.DOTALL | re.IGNORECASE)
    if not body_match:
        return ""
    
    body = body_match.group(1)
    
    # Replace class= with className=
    body = re.sub(r'\bclass=', 'className=', body)
    
    # Replace for= with htmlFor=
    body = re.sub(r'\bfor=', 'htmlFor=', body)
    
    # Convert inline styles
    def style_replacer(match):
        return 'style=' + style_to_react(match.group(1))
    
    body = re.sub(r'style="([^"]*)"', style_replacer, body)
    
    # Close self-closing tags
    for tag in ['img', 'input', 'br', 'hr']:
        body = re.sub(rf'<{tag}([^>]*?)(?<!/)>', rf'<{tag}\1 />', body)
    
    # Handle SVG attributes (e.g. stroke-width -> strokeWidth, fill-rule -> fillRule)
    svg_attrs = ['stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill-rule', 'clip-rule', 'stroke-miterlimit', 'stroke-dasharray', 'stroke-dashoffset']
    for attr in svg_attrs:
        parts = attr.split('-')
        camel = parts[0] + ''.join(x.title() for x in parts[1:])
        body = re.sub(rf'\b{attr}=', f'{camel}=', body)
        
    return body

os.makedirs('app/events', exist_ok=True)
os.makedirs('app/notices', exist_ok=True)
os.makedirs('app/profile', exist_ok=True)
os.makedirs('components', exist_ok=True)

# Process design system JSON to globals.css
with open('screens/design_system.json', 'r') as f:
    ds = json.load(f)
    
theme_vars = []
colors = ds['designSystem']['theme']['namedColors']
for k, v in colors.items():
    theme_vars.append(f"  --color-{k.replace('_', '-')}: {v};")

typography = ds['designSystem']['theme']['typography']
for k, v in typography.items():
    font_size = v['fontSize']
    theme_vars.append(f"  --text-{k}: {font_size};")
    if 'lineHeight' in v:
        theme_vars.append(f"  --text-{k}--line-height: {v['lineHeight']};")
    if 'fontWeight' in v:
        theme_vars.append(f"  --text-{k}--font-weight: {v['fontWeight']};")
    if 'letterSpacing' in v:
        theme_vars.append(f"  --text-{k}--letter-spacing: {v['letterSpacing']};")

spacing = ds['designSystem']['theme']['spacing']
for k, v in spacing.items():
    theme_vars.append(f"  --spacing-{k}: {v};")

theme_css = "@import 'tailwindcss';\n\n@theme {\n" + "\n".join(theme_vars) + "\n  --font-inter: 'Inter', sans-serif;\n}\n"
with open('app/globals.css', 'w') as f:
    f.write(theme_css)

# Update layout.tsx to import Inter font
layout_ts = """import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Campus Connect",
  description: "Campus Connect Mobile Ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-background text-on-background min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
"""
with open('app/layout.tsx', 'w') as f:
    f.write(layout_ts)

for screen in screens:
    with open(f'screens/{screen}.html', 'r') as f:
        html = f.read()
    
    jsx = convert_html_to_jsx(html)
    
    # We will just write the page component, we can extract TopNavBar and BottomNav manually later or keep them inline for now to avoid breaking.
    page_name = screen.title().replace('_', '')
    route = 'app/page.tsx' if screen == 'home' else f'app/{screen.replace("my_profile", "profile")}/page.tsx'
    
    component = f"""import React from 'react';

export default function {page_name}() {{
  return (
    <>
      {jsx}
    </>
  );
}}
"""
    # Fix some tricky tags (e.g. SVG path class doesn't matter much but let's just make sure it compiles)
    with open(route, 'w') as f:
        f.write(component)

print("Conversion complete")
