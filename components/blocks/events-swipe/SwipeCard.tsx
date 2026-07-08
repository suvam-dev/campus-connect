"use client";

import React, { useMemo, useState } from "react";
import { motion, useMotionValue, PanInfo } from "framer-motion";
import { CategoryBadge } from "./CategoryBadge";
import { ProgressIndicator } from "./ProgressIndicator";
import { EventMeta } from "./EventMeta";
import { CardControls } from "./CardControls";

interface LocalEvent {
  id: string;
  title: string;
  venue: string;
  date: string;
  time: string;
  image?: string;
  category?: string;
  shortDescription?: string;
  description?: string;
}

interface SwipeCardProps {
  uniqueKey: string;
  event: LocalEvent;
  removeCard: (uniqueKey: string, swipe: "left" | "right") => void;
  active: boolean;
  zIndex: number;
  totalCards: number;
  currentIndex: number;
}

const FALLBACK_IMAGE = "/images/event-fallback.svg";

const backgroundColors = [
  "#FFFFFF",
  "#FAFAFD",
  "#F4F2FF",
  "#F7F7F9",
  "#FFFFFF",
  "#FAFAFD",
  "#F4F2FF",
  "#F7F7F9",
  "#FFFFFF",
  "#FAFAFD",
];

const calculateRadialRotation = (index: number) => {
  if (index === 0) return 0;
  const direction = index % 2 !== 0 ? -1 : 1;
  const step = Math.ceil(index / 2);
  return direction * step * 12;
};

export const SwipeCard = React.memo(
  ({
    uniqueKey,
    event,
    removeCard,
    active,
    zIndex,
    totalCards,
    currentIndex,
  }: SwipeCardProps) => {
    const x = useMotionValue(0);
    const [imgError, setImgError] = useState(false);

    const resolvedImage =
      !imgError && event.image?.trim()
        ? event.image
        : FALLBACK_IMAGE;

    const idleRotate = useMemo(
      () => calculateRadialRotation(zIndex),
      [zIndex]
    );

    const handleDragEnd = (_e: unknown, info: PanInfo) => {
      const offset = info.offset.x;
      const velocity = info.velocity.x;

      if (offset > 80 || velocity > 400) {
        removeCard(uniqueKey, "right");
      } else if (offset < -80 || velocity < -400) {
        removeCard(uniqueKey, "left");
      }
    };

    // All cards are the same size — no scaling down for background cards
    const scale = 1;

    const opacityValues = [1, 1, 0.95, 0.85, 0.7, 0.5, 0.3, 0.2, 0.1, 0.05];
    const opacity = active ? 1 : opacityValues[zIndex] || 0;

    const bgColor = backgroundColors[zIndex % backgroundColors.length];

    return (
      <motion.div
        className="absolute top-0 left-1/2 w-full"
        style={{
          x: active ? x : 0,
          marginLeft: "-50%",
          zIndex: 50 - zIndex,
          transformOrigin: active ? "50% 50%" : "50% 120%",
          boxShadow: active
            ? "0 6px 20px rgba(0,0,0,0.05), 0 30px 80px rgba(0,0,0,0.08), 0 60px 140px rgba(124,58,237,0.06)"
            : "0 4px 10px rgba(0,0,0,0.02), 0 10px 30px rgba(0,0,0,0.04)",
          borderRadius: "28px",
        }}
        drag={active ? "x" : false}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        onDragEnd={handleDragEnd}
        initial={{
          scale: 0.5,
          opacity: 0,
          y: 50,
          rotate: idleRotate,
        }}
        animate={{
          scale,
          y: 0,
          opacity,
          rotate: active ? 0 : idleRotate,
          backgroundColor: bgColor,
        }}
        exit={{
          x: x.get() > 0 ? 400 : -400,
          rotate: x.get() > 0 ? 15 : -15,
          opacity: 0,
          scale: 0.8,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          rotate: { type: "spring", stiffness: 180, damping: 18 },
          backgroundColor: { duration: 0.3 },
        }}
        whileHover={active ? { scale: 1.01 } : {}}
      >
        {active && (
          <div className="absolute inset-0 bg-[#7C3AED] opacity-[0.03] blur-xl rounded-[28px] -z-10" />
        )}

        <div
          className="w-full flex flex-col overflow-hidden select-none relative"
          style={{
            borderRadius: "28px",
            border: "1px solid #ECECF3",
            backgroundColor: "#FFFFFF",
          }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between p-4 pb-3 bg-transparent relative z-10">
            <CategoryBadge category={event.category || "Event"} />
            <ProgressIndicator
              currentIndex={currentIndex}
              total={totalCards}
            />
          </div>

          {/* Image */}
          <div className="relative w-full h-[180px] sm:h-[200px] shrink-0 bg-slate-100">
            <img
              src={resolvedImage}
              alt={event.title}
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
              loading="lazy"
              onError={() => setImgError(true)}
            />
          </div>

          {/* Content — always visible on all cards */}
          <div className="p-5 pt-4 flex flex-col bg-transparent">
            <h3 className="text-xl font-bold text-[#1F2937] leading-tight line-clamp-2 mb-1.5">
              {event.title}
            </h3>

            <p className="text-sm text-[#6B7280] line-clamp-2 leading-relaxed mb-3">
              {event.shortDescription || event.description?.replace(/<[^>]*>/g, '').slice(0, 120) || "Join us for this exciting event!"}
            </p>
            <EventMeta
              date={event.date}
              time={event.time}
              venue={event.venue}
            />
            <div className="mt-1">
              <CardControls eventId={event.id} />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

SwipeCard.displayName = "SwipeCard";
