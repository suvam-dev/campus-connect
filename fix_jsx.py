import os
import re

def fix_comments(content):
    # Convert HTML comments to JSX comments, ignoring <!- or similar edge cases
    # Regex for <!-- something -->
    return re.sub(r'<!--(.*?)-->', r'{/*\1*/}', content, flags=re.DOTALL)

for root, dirs, files in os.walk('app'):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()
            content = fix_comments(content)
            
            # If it's layout.tsx, replace next/font/google
            if file == 'layout.tsx':
                content = content.replace('import { Inter } from "next/font/google";', '')
                content = content.replace('const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });', '')
                content = content.replace('className={`${inter.variable} font-sans', 'className={`font-sans')

            with open(path, 'w') as f:
                f.write(content)

print("Fixed JSX comments")
