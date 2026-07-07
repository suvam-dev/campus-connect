"use client";

import { useMemo } from "react";
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
  const html = useMemo(() => {
    try {
      if (!content) return "";
      
      // If it's not a JSON string (e.g. legacy data), just return it or wrap in p tag
      if (!content.trim().startsWith("{")) {
        return `<p>${content}</p>`;
      }

      const json = JSON.parse(content);
      
      return generateHTML(json, [
        StarterKit,
        Link,
        Image,
        Table,
        TableRow,
        TableHeader,
        TableCell,
      ]);
    } catch (e) {
      console.error("Failed to parse rich text:", e);
      return `<p>${content}</p>`;
    }
  }, [content]);

  return (
    <div 
      className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none prose-indigo"
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
}
