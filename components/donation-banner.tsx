"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Heart, Gift, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

interface DonationBannerProps {
  position: "header" | "footer" | "preview"
  className?: string
}

export function DonationBanner({ position, className = "" }: DonationBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { theme } = useTheme()
  const isMobile = useMobile()
  const donationUrl = "https://www.paypal.com/donate/?business=A6BZAPTWMMSEC&no_recurring=0&currency_code=BRL"

  // Banner text based on position
  const getBannerText = () => {
    switch (position) {
      case "header":
        return isMobile ? "Support this tool!" : "Support this free resume builder tool!"
      case "footer":
        return isMobile ? "Found it helpful?" : "Did you find this tool helpful? Consider supporting us!"
      case "preview":
        return isMobile ? "Love your resume?" : "Love your new resume? Help us keep this tool free!"
      default:
        return "Support this project!"
    }
  }

  // Get icon based on position
  const getBannerIcon = () => {
    switch (position) {
      case "header":
        return <Star className={`${isMobile ? "h-4 w-4" : "h-5 w-5"}`} aria-hidden="true" />
      case "footer":
        return <Gift className={`${isMobile ? "h-4 w-4" : "h-5 w-5"}`} aria-hidden="true" />
      case "preview":
        return <Star className={`${isMobile ? "h-4 w-4" : "h-5 w-5"}`} aria-hidden="true" />
      default:
        return <Heart className={`${isMobile ? "h-4 w-4" : "h-5 w-5"}`} aria-hidden="true" />
    }
  }

  useEffect(() => {
    // Check if the banner has been dismissed before
    const isDismissed = localStorage.getItem(`donation-banner-${position}-dismissed`)

    if (!isDismissed) {
      setIsVisible(true)
      // Track impression
      trackImpression(position)
    }
  }, [position])

  const dismissBanner = (e: React.MouseEvent) => {
    // Prevent the event from bubbling up to the form
    e.preventDefault()
    e.stopPropagation()

    setIsVisible(false)
    // Save dismissal preference to localStorage
    localStorage.setItem(`donation-banner-${position}-dismissed`, "true")
  }

  const handleDonateClick = (e: React.MouseEvent) => {
    // Prevent the event from bubbling up to the form
    e.preventDefault()
    e.stopPropagation()

    // Track click
    trackClick(position)
    // Open donation URL in new tab
    window.open(donationUrl, "_blank")
  }

  // Track banner impression
  const trackImpression = (bannerPosition: string) => {
    // In a real app, you might send this to an analytics service
    console.log(`Banner impression: ${bannerPosition}`)

    // Update impression count in localStorage
    const impressions = JSON.parse(localStorage.getItem("donation-banner-impressions") || "{}")
    impressions[bannerPosition] = (impressions[bannerPosition] || 0) + 1
    localStorage.setItem("donation-banner-impressions", JSON.stringify(impressions))
  }

  // Track donation click
  const trackClick = (bannerPosition: string) => {
    // In a real app, you might send this to an analytics service
    console.log(`Banner click: ${bannerPosition}`)

    // Update click count in localStorage
    const clicks = JSON.parse(localStorage.getItem("donation-banner-clicks") || "{}")
    clicks[bannerPosition] = (clicks[bannerPosition] || 0) + 1
    localStorage.setItem("donation-banner-clicks", JSON.stringify(clicks))
  }

  if (!isVisible) return null

  // Different styles based on position
  const getPositionStyles = () => {
    switch (position) {
      case "header":
        return "rounded-lg mb-6"
      case "footer":
        return "rounded-lg mt-8"
      case "preview":
        return "rounded-lg my-6"
      default:
        return "rounded-lg my-4"
    }
  }

  // Get background pattern based on theme
  const getBackgroundPattern = () => {
    return theme === "dark"
      ? "radial-gradient(circle at 25% 110%, rgba(124, 58, 237, 0.15) 0%, transparent 70%), radial-gradient(circle at 75% 10%, rgba(56, 189, 248, 0.15) 0%, transparent 70%)"
      : "radial-gradient(circle at 25% 110%, rgba(124, 58, 237, 0.08) 0%, transparent 70%), radial-gradient(circle at 75% 10%, rgba(56, 189, 248, 0.08) 0%, transparent 70%)"
  }

  return (
    <aside className={`${getPositionStyles()} ${className}`} aria-label={`${position} donation banner`}>
      <Card
        className="relative overflow-hidden shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`p-3 sm:p-5 flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r ${
            theme === "dark"
              ? "from-violet-950/40 to-blue-950/40 border-violet-800/30"
              : "from-violet-50 to-blue-50 border-violet-200/50"
          }`}
          style={{
            backgroundImage: getBackgroundPattern(),
            transition: "all 0.3s ease",
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-blue-500 opacity-80"></div>

          <div className="flex-1 mb-3 sm:mb-0 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: isHovered ? 20 : 0 }}
                transition={{ duration: 0.3 }}
                className={`p-1 sm:p-1.5 rounded-full ${
                  theme === "dark" ? "bg-violet-800/30 text-violet-300" : "bg-violet-100 text-violet-600"
                }`}
              >
                {getBannerIcon()}
              </motion.div>
              <h2 className="font-semibold text-base sm:text-lg">{getBannerText()}</h2>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
              Your support helps us maintain and improve this free tool for everyone
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                onClick={handleDonateClick}
                className={`relative overflow-hidden group text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 h-auto ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500"
                    : "bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-400 hover:to-blue-400"
                }`}
              >
                <span className="flex items-center gap-1 sm:gap-2">
                  <Heart className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                  <span>Donate{isMobile ? "" : " Now"}</span>
                  <ArrowRight
                    className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
              </Button>
            </motion.div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={`rounded-full h-6 w-6 sm:h-8 sm:w-8 ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
              onClick={dismissBanner}
              aria-label="Dismiss donation banner"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Card>
    </aside>
  )
}
