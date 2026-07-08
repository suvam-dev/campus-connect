"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { useEffect, useState } from "react";
import { 
  Bold, Italic, Strikethrough, Heading1, Heading2, 
  List, ListOrdered, Quote, Code, Link as LinkIcon 
} from "lucide-react";

interface RichTextEditorProps {
  name?: string;
  defaultValue?: string; // JSON string
  onChange?: (json: string) => void;
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b bg-slate-50 rounded-t-md">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1 rounded ${editor.isActive("bold") ? "bg-slate-200" : "hover:bg-slate-200"}`}
      >
        <Bold size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1 rounded ${editor.isActive("italic") ? "bg-slate-200" : "hover:bg-slate-200"}`}
      >
        <Italic size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-1 rounded ${editor.isActive("strike") ? "bg-slate-200" : "hover:bg-slate-200"}`}
      >
        <Strikethrough size={16} />
      </button>
      
      <div className="w-px h-6 bg-slate-300 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-1 rounded ${editor.isActive("heading", { level: 1 }) ? "bg-slate-200" : "hover:bg-slate-200"}`}
      >
        <Heading1 size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1 rounded ${editor.isActive("heading", { level: 2 }) ? "bg-slate-200" : "hover:bg-slate-200"}`}
      >
        <Heading2 size={16} />
      </button>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1 rounded ${editor.isActive("bulletList") ? "bg-slate-200" : "hover:bg-slate-200"}`}
      >
        <List size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1 rounded ${editor.isActive("orderedList") ? "bg-slate-200" : "hover:bg-slate-200"}`}
      >
        <ListOrdered size={16} />
      </button>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-1 rounded ${editor.isActive("blockquote") ? "bg-slate-200" : "hover:bg-slate-200"}`}
      >
        <Quote size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-1 rounded ${editor.isActive("codeBlock") ? "bg-slate-200" : "hover:bg-slate-200"}`}
      >
        <Code size={16} />
      </button>
      
      <div className="w-px h-6 bg-slate-300 mx-1" />

      <button
        type="button"
        onClick={() => {
          const url = window.prompt('URL');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={`p-1 rounded ${editor.isActive("link") ? "bg-slate-200" : "hover:bg-slate-200"}`}
      >
        <LinkIcon size={16} />
      </button>
    </div>
  );
};

export default function RichTextEditor({ name, defaultValue, onChange }: RichTextEditorProps) {
  const [contentJson, setContentJson] = useState(defaultValue || "");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: defaultValue ? JSON.parse(defaultValue) : "",
    onUpdate: ({ editor }) => {
      const json = JSON.stringify(editor.getJSON());
      setContentJson(json);
      if (onChange) {
        onChange(json);
      }
    },
    editorProps: {
      attributes: {
        className: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[200px] p-4",
      },
    },
  });

  // Cleanup editor on unmount
  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  return (
    <div className="border border-slate-300 rounded-md overflow-hidden flex flex-col focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
      <MenuBar editor={editor} />
      <div className="flex-1 overflow-y-auto bg-white">
        <EditorContent editor={editor} />
      </div>
      {name && <input type="hidden" name={name} value={contentJson} />}
    </div>
  );
}
