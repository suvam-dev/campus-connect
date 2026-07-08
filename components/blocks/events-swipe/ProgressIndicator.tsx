import React from "react";

interface ProgressIndicatorProps {
  currentIndex: number;
  total: number;
}

export function ProgressIndicator({ currentIndex, total }: ProgressIndicatorProps) {
  const formatNumber = (num: number) => num.toString().padStart(2, "0");
  
  return (
    <div className="text-sm font-bold text-[#6B7280]">
      {formatNumber(currentIndex + 1)} / {formatNumber(total)}
    </div>
  );
}
