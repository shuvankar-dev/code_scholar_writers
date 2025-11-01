import React from "react"
import { cn } from "@/lib/utils"

export interface OrbitingCirclesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  path?: boolean
  iconSize?: number
  speed?: number
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  delay = 0,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed
  return (
    <div className="relative">
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index
        return (
          <div
            key={index}
            style={
              {
                "--duration": calculatedDuration,
                "--radius": radius,
                "--delay": delay * index,
                "--icon-size": `${iconSize}px`,
              } as React.CSSProperties
            }
            className={cn(
              `absolute left-1/2 top-1/2 flex size-[var(--icon-size)] -translate-x-1/2 -translate-y-1/2 transform-gpu animate-orbit items-center justify-center rounded-full [animation-delay:calc(var(--delay)*1s)]`,
              { "[animation-direction:reverse]": reverse },
              className
            )}
            {...props}
          >
            <div
              style={{
                transform: `rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`,
              }}
            >
              {child}
            </div>
          </div>
        )
      })}
    </div>
  )
}
