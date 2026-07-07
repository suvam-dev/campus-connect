import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractPlainText(content: string): string {
  try {
    if (!content) return "";
    if (!content.trim().startsWith("{")) return content; // Not JSON

    const json = JSON.parse(content);
    
    // Recursive function to extract text from Tiptap JSON
    let text = "";
    const extract = (node: any) => {
      if (node.type === "text" && node.text) {
        text += node.text + " ";
      }
      if (node.content && Array.isArray(node.content)) {
        node.content.forEach(extract);
      }
    };
    
    extract(json);
    return text.trim();
  } catch (e) {
    return content || "";
  }
}
