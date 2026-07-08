"use client";


import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";

interface RichTextRendererProps {
  content: string; // JSON string
}

export default function RichTextRenderer({ content }: RichTextRendererProps) {
  let html = "";
  try {
    if (!content) {
      html = "";
    } else if (!content.trim().startsWith("{")) {
      html = `<p>${content}</p>`;
    } else {
      const json = JSON.parse(content);
      html = generateHTML(json, [
        StarterKit,
        Link,
        Image,
        Table,
        TableRow,
        TableHeader,
        TableCell,
      ]);
    }
  } catch (e) {
    console.error("Failed to parse rich text:", e);
    html = `<p>${content}</p>`;
  }

  return (
    <div 
      className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none prose-indigo"
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
}
