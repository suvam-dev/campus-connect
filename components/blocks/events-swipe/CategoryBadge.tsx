import React from "react";

interface CategoryBadgeProps {
  category: string;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  if (!category) return null;
  
  return (
    <div className="px-3 py-1 rounded-full bg-[#F8F8FA] border border-[#ECECF3] inline-flex items-center justify-center">
      <span className="text-xs font-bold text-[#1F2937] uppercase tracking-wider">
        {category}
      </span>
    </div>
  );
}
