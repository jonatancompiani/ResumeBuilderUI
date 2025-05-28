"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Heart, Download, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

interface PreviewDonationBannerProps {
  className?: string
}

export function PreviewDonationBanner({ className = "" }: PreviewDonationBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { theme } = useTheme()
  const donationUrl = "https://www.paypal.com/donate/?business=A6BZAPTWMMSEC&no_recurring=0&currency_code=BRL"

  useEffect(() => {
    // Check if the banner has been dismissed before
    const isDismissed = localStorage.getItem(`donation-banner-preview-dismissed`)

    if (!isDismissed) {
      setIsVisible(true)
      // Track impression
      trackImpression("preview")
    }
  }, [])

  const dismissBanner = (e: React.MouseEvent) => {
    // Prevent the event from bubbling up to the form
    e.preventDefault()
    e.stopPropagation()

    setIsVisible(false)
    // Save dismissal preference to localStorage
    localStorage.setItem(`donation-banner-preview-dismissed`, "true")
  }

  const handleDonateClick = (e: React.MouseEvent) => {
    // Prevent the event from bubbling up to the form
    e.preventDefault()
    e.stopPropagation()

    // Track click
    trackClick("preview")
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

  return (
    <Card
      className={`relative overflow-hidden shadow-lg rounded-lg my-6 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`p-6 ${
          theme === "dark"
            ? "bg-gradient-to-br from-violet-900/30 via-blue-900/30 to-violet-900/30 border-violet-700/30"
            : "bg-gradient-to-br from-violet-50 via-blue-50 to-violet-50 border-violet-200/50"
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='${theme === "dark" ? "rgba(124, 58, 237, 0.05)" : "rgba(124, 58, 237, 0.03)"}' fillRule='evenodd'/%3E%3C/svg%3E")`,
          transition: "all 0.3s ease",
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-blue-500 to-violet-500 opacity-80"></div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 rounded-full ${
            theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
          }`}
          onClick={dismissBanner}
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
            className={`p-3 rounded-full mb-4 ${
              theme === "dark" ? "bg-violet-800/30 text-violet-300" : "bg-violet-100 text-violet-600"
            }`}
          >
            <Heart className="h-8 w-8" />
          </motion.div>

          <h3 className="text-2xl font-bold mb-2">Love your new resume?</h3>
          <p className="text-muted-foreground mb-6">
            Your support helps us maintain this free tool and develop new features. Consider making a small donation to
            keep this service available for everyone.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full">
              <Button
                type="button"
                onClick={handleDonateClick}
                className={`w-full relative overflow-hidden group ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500"
                    : "bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-400 hover:to-blue-400"
                }`}
                size="lg"
              >
                <span className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  <span>Donate Now</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full">
              <Button type="button" variant="outline" onClick={dismissBanner} className="w-full" size="lg">
                <span className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  <span>Maybe Later</span>
                </span>
              </Button>
            </motion.div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>One-time donation</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Secure payment</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Support future updates</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
