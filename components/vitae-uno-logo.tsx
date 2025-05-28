"use client"

import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "full" | "icon" | "compact"
}

export function VitaeUnoLogo({ className = "", size = "md", variant = "full" }: LogoProps) {
  const { theme } = useTheme()
  const isMobile = useMobile()
  const isDark = theme === "dark"

  // Automatically switch to compact variant on very small screens
  const effectiveVariant = isMobile && window.innerWidth < 380 ? "compact" : variant

  // Size mapping for different display sizes - adjusted for mobile
  const sizeMap = {
    sm: isMobile ? "h-10" : "h-12",
    md: isMobile ? "h-14" : "h-16",
    lg: isMobile ? "h-16" : "h-20",
    xl: isMobile ? "h-20" : "h-28",
  }

  // Colors based on theme
  const primaryColor = isDark ? "#8B5CF6" : "#7C3AED" // Purple
  const accentColor = "#06B6D4" // Cyan accent

  // Icon-only version (for favicon and small displays)
  if (effectiveVariant === "icon") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <svg viewBox="0 0 40 40" className={sizeMap[size]} aria-hidden="true">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={accentColor} />
            </linearGradient>
          </defs>

          {/* Pacifico "V" */}
          <text
            x="18"
            y="26"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Pacifico, cursive"
            fontSize="26"
            fill="white"
          >
            V
          </text>
        </svg>
        <span className="sr-only">vitae.uno logo icon</span>
      </div>
    )
  }

  // Compact version for very small screens - just title, no subtitle
  if (effectiveVariant === "compact") {
    return (
      <div className={cn("flex justify-center items-center", className)}>
        <div className="pacifico-regular text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500 text-3xl sm:text-4xl drop-shadow-sm">
          vitae.uno
        </div>
        <span className="sr-only">vitae.uno logo</span>
      </div>
    )
  }

  // Full logo with text and subtitle - with true horizontal centering
  return (
    <div className={cn("relative w-full flex justify-center", className)}>
      {/* Title and subtitle text - truly centered on screen */}
      <div className="flex flex-col items-center text-center">
        {/* Main title with Pacifico font */}
        <div className="pacifico-regular text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500 text-4xl sm:text-5xl md:text-6xl drop-shadow-sm">
          vitae.uno
        </div>

        {/* Subtitle - hidden on very small screens */}
        <div className="text-center text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
          Free curriculum vitae generator, not perfect, but free
        </div>
      </div>
      <span className="sr-only">vitae.uno - Free resume builder</span>
    </div>
  )
}
