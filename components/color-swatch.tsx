"use client"

import { cn } from "@/lib/utils"

interface ColorSwatchProps {
  color: string
  isSelected: boolean
  onClick: () => void
  className?: string
}

export function ColorSwatch({ color, isSelected, onClick, className }: ColorSwatchProps) {
  // Determine if the color is light or dark to ensure checkmark visibility
  const isLightColor = () => {
    // Convert hex to RGB
    const hex = color.replace("#", "")
    const r = Number.parseInt(hex.substring(0, 2), 16)
    const g = Number.parseInt(hex.substring(2, 4), 16)
    const b = Number.parseInt(hex.substring(4, 6), 16)

    // Calculate perceived brightness (YIQ formula)
    return (r * 299 + g * 587 + b * 114) / 1000 > 128
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative w-full aspect-square rounded-md transition-all duration-200",
        "hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
        isSelected && "ring-2 ring-offset-2 ring-primary shadow-lg",
        className,
      )}
      style={{ backgroundColor: color }}
      aria-label={`Select color ${color}`}
      aria-pressed={isSelected}
    >
      {isSelected && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`rounded-full p-1 ${isLightColor() ? "bg-gray-800" : "bg-white"}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isLightColor() ? "text-white" : "text-gray-800"}
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
      )}
    </button>
  )
}
