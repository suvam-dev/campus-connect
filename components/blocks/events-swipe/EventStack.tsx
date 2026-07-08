"use client";

import React, { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import styles from "./EventStack.module.css";

// ─── Types ───
interface EventData {
  id: string;
  title: string;
  venue: string;
  date: string;
  time: string;
  image?: string;
  category?: string;
  description?: string;
  shortDescription?: string;
}

interface EventStackProps {
  events: EventData[];
}

// ─── Constants ───
const MAX_VISIBLE = 5;
const SWIPE_THRESHOLD = 100;
const FALLBACK_IMAGE = "/images/event-fallback.svg";

// Card positions — alternating left/right fan
function getPositionStyle(position: number) {
  // position 0 = front, 1 = first behind, 2 = second behind, etc.
  if (position === 0) {
    return { rotate: 0, tx: 0, zIndex: MAX_VISIBLE, opacity: 1 };
  }
  const direction = position % 2 !== 0 ? -1 : 1;
  const step = Math.ceil(position / 2);
  return {
    rotate: direction * step * 8,
    tx: direction * step * 6,
    zIndex: MAX_VISIBLE - position,
    opacity: Math.max(0.15, 1 - position * 0.2),
  };
}

// ─── SwipeCard ───
function SwipeCard({
  event,
  position,
  onShuffle,
  currentIndex,
  totalEvents,
}: {
  event: EventData;
  position: number;
  onShuffle: () => void;
  currentIndex: number;
  totalEvents: number;
}) {
  const startX = useRef(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [imgError, setImgError] = useState(false);
  const isFront = position === 0;

  const resolvedImage =
    !imgError && event.image?.trim() ? event.image : FALLBACK_IMAGE;

  const descriptionText =
    event.shortDescription ||
    event.description?.replace(/<[^>]*>/g, "").slice(0, 120) ||
    "Join us for this exciting event!";

  // ─── Pointer handlers ───
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isFront) return;
    startX.current = e.clientX;
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragX(e.clientX - startX.current);
  };

  const handlePointerUp = () => {
    if (!dragging) return;
    if (Math.abs(dragX) > SWIPE_THRESHOLD) {
      onShuffle();
    }
    setDragging(false);
    setDragX(0);
  };

  // ─── Position styles ───
  const pos = getPositionStyle(position);
  const transform = isFront
    ? `translateX(calc(-50% + ${pos.tx}px + ${dragX}px)) rotate(${pos.rotate}deg)`
    : `translateX(calc(-50% + ${pos.tx}px)) rotate(${pos.rotate}deg)`;

  const formatIndex = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className={`${styles.shuffleCard} ${isFront ? styles.shuffleFront : ""} ${
        dragging ? styles.dragging : ""
      }`}
      style={{
        transform,
        zIndex: pos.zIndex,
        opacity: pos.opacity,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Header */}
      <div className={styles.cardHeader}>
        <span className={styles.categoryBadge}>
          {event.category || "Event"}
        </span>
        <span className={styles.progressText}>
          {formatIndex(currentIndex + 1)} / {formatIndex(totalEvents)}
        </span>
      </div>

      {/* Image */}
      <img
        src={resolvedImage}
        alt={event.title}
        className={styles.cardImage}
        draggable={false}
        loading="lazy"
        onError={() => setImgError(true)}
      />

      {/* Content */}
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{event.title}</h3>
        <p className={styles.cardDescription}>{descriptionText}</p>

        {/* Meta */}
        <div className={styles.metaGrid}>
          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <Calendar className={styles.metaIcon} />
              {event.date}
            </span>
            <span className={styles.metaItem}>
              <Clock className={styles.metaIcon} />
              {event.time}
            </span>
          </div>
          <hr className={styles.metaDivider} />
          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <MapPin className={styles.metaIcon} />
              {event.venue}
            </span>
            <span className={styles.metaItem}>
              <Users className={styles.metaIcon} />
              12 seats left
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.cardActions}>
        <Link
          href={`/events/${event.id}`}
          className={styles.registerBtn}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
        >
          Register
        </Link>
        <Link
          href={`/events/${event.id}`}
          className={styles.detailsBtn}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
        >
          Details
        </Link>
      </div>
    </div>
  );
}

// ─── EventStack ───
export function EventStack({ events }: EventStackProps) {
  const [deckOrder, setDeckOrder] = useState<number[]>(() =>
    events.slice(0, MAX_VISIBLE).map((_, i) => i)
  );
  const nextPointerRef = useRef(
    Math.min(MAX_VISIBLE, events.length)
  );
  const [swipeCount, setSwipeCount] = useState(0);

  const handleShuffle = useCallback(() => {
    setDeckOrder((prev) => {
      const rest = prev.slice(1);

      // Add the next event from the full list at the back
      if (events.length > MAX_VISIBLE) {
        const nextIdx = nextPointerRef.current % events.length;
        nextPointerRef.current++;
        return [...rest, nextIdx];
      }

      // If ≤ MAX_VISIBLE events, just cycle
      return [...rest, prev[0]];
    });
    setSwipeCount((s) => s + 1);
  }, [events.length]);

  if (!events || events.length === 0) return null;

  const logicalIndex = swipeCount % events.length;

  return (
    <div className={styles.shuffleWrap}>
      <div className={styles.shuffleStage}>
        {deckOrder.map((eventIdx, position) => (
          <SwipeCard
            key={`${eventIdx}-${position}`}
            event={events[eventIdx]}
            position={position}
            onShuffle={handleShuffle}
            currentIndex={logicalIndex}
            totalEvents={events.length}
          />
        ))}
      </div>
      <p className={styles.shuffleHint}>Swipe to see more</p>
    </div>
  );
}
