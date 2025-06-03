"use client";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number || 15).fill(true); // Reduced default number for less density
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteors.map((el, idx) => {
        const meteorCount = number || 15;
        // Calculate position to distribute meteors horizontally
        const position = idx * (100 / meteorCount); // Use percentage for better responsiveness
        // Vary the sizes slightly for more natural appearance
        const size = Math.floor(Math.random() * 3) + 2; // Random size between 2-4px

        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect absolute rounded-full bg-slate-300 meteor-glow",
              className,
            )}
            style={{
              top: "-2px", // Start just above the container
              left: `${position}%`,
              height: `${size}px`,
              width: `${size}px`,
              animationDelay: Math.random() * 10 + "s", // Longer random delay for more distributed effect
              animationDuration: Math.floor(Math.random() * (12 - 8) + 8) + "s", // Slower fall (8-12s)
              opacity: 0.7 + Math.random() * 0.3, // Slightly random opacity for variety
            }}
          ></span>
        );
      })}
    </div>
  );
}; 