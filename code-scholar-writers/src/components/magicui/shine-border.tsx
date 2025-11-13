"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the border in pixels
   * @default 1
   */
  borderWidth?: number;
  /**
   * Duration of the animation in seconds
   * @default 14
   */
  duration?: number;
  /**
   * Color of the border, can be a single color or an array of colors
   * @default "#000000"
   */
  shineColor?: string | string[];
}

/**
 * Shine Border
 *
 * An animated background border effect component with configurable properties.
 */
export function ShineBorder({
  borderWidth = 15,
  shineColor = ["#A07CFE", "#FE8FB5", "#FFBE7B"],
  className,
  style,
  ...props
}: ShineBorderProps) {
  const gradientColor = Array.isArray(shineColor) ? shineColor.join(", ") : shineColor;

  return (
    <div
      style={{
        borderWidth: `${borderWidth}px`,
        borderStyle: "solid",
        borderImage: `linear-gradient(45deg, ${gradientColor}) 1`,
        borderRadius: "inherit",
        padding: "var(--border-width)",
        ...style,
      }}
      className={cn("absolute inset-0 size-full rounded-[inherit]", className)}
      {...props}
    />
  );
}
