import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Campus Connect",
  description: "Campus Connect Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`font-sans antialiased bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
