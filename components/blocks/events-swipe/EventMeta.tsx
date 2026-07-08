import React from "react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

interface EventMetaProps {
  date: string;
  time: string;
  venue: string;
}

export function EventMeta({ date, time, venue }: EventMetaProps) {
  // Try to parse the date to something like "Aug 1" if possible, but keep it safe.
  // Assuming date might be "2026-08-01" or similar.
  const displayDate = date; 
  
  return (
    <div className="flex flex-col gap-3 mt-4">
      {/* Top Row: Date & Time */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-[#1F2937]">
          <Calendar className="w-4 h-4 shrink-0 text-[#6B7280]" />
          <span className="text-[13px] font-semibold tracking-wide">{displayDate}</span>
        </div>
        
        <div className="flex items-center gap-2 text-[#1F2937]">
          <Clock className="w-4 h-4 shrink-0 text-[#6B7280]" />
          <span className="text-[13px] font-semibold tracking-wide">{time}</span>
        </div>
      </div>
      
      {/* Divider */}
      <hr className="border-[#ECECF3] my-1" />
      
      {/* Bottom Row: Venue & Seats */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-[#1F2937]">
          <MapPin className="w-4 h-4 shrink-0 text-[#6B7280]" />
          <span className="text-[13px] font-semibold tracking-wide line-clamp-1 max-w-[120px]">{venue}</span>
        </div>
        
        {/* Mock seats left since it's not in the base Event interface */}
        <div className="flex items-center gap-2 text-[#1F2937]">
          <Users className="w-4 h-4 shrink-0 text-[#6B7280]" />
          <span className="text-[13px] font-semibold tracking-wide">12 seats left</span>
        </div>
      </div>
    </div>
  );
}
