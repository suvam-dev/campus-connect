"use client";

import React from "react";
import { motion } from "framer-motion";

export function CardBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background base */}
      <div className="absolute inset-0 bg-[#FFFFFF]" />

      {/* Floating Blobs */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: "#7C3AED",
          opacity: 0.05,
          filter: "blur(120px)",
          top: "10%",
          left: "-10%",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          background: "#A78BFA",
          opacity: 0.05,
          filter: "blur(100px)",
          bottom: "10%",
          right: "-10%",
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
