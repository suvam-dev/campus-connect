import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CardControlsProps {
  eventId: string;
}

export function CardControls({ eventId }: CardControlsProps) {
  return (
    <div className="flex items-center gap-3 mt-6">
      <Button 
        className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-[18px] h-[52px] text-[15px] font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        Register
      </Button>
      <Link href={`/events/${eventId}`} className="flex-1" onClick={(e) => e.stopPropagation()}>
        <Button 
          variant="outline"
          className="w-full bg-[#F4F2FF]/50 border-2 border-[#ECECF3] hover:border-[#D4D4DD] text-[#1F2937] hover:bg-[#F4F2FF] rounded-[18px] h-[52px] text-[15px] font-semibold hover:-translate-y-0.5 transition-all duration-300"
        >
          Details
        </Button>
      </Link>
    </div>
  );
}
