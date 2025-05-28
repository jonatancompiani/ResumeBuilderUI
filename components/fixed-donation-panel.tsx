"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

export function FixedDonationPanel() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  const donationUrl = "https://www.paypal.com/donate/?business=A6BZAPTWMMSEC&no_recurring=0&currency_code=BRL"

  useEffect(() => {
    setMounted(true)

    // Check if panel has been dismissed
    const isDismissed = localStorage.getItem("fixed-donation-panel-dismissed")

    if (!isDismissed) {
      // Show panel after a delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 3000) // Show after 3 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  const handleDonate = () => {
    // Track donation click
    console.log("Fixed donation panel clicked")

    // Update click count in localStorage
    const clicks = JSON.parse(localStorage.getItem("donation-panel-clicks") || "{}")
    clicks.fixed = (clicks.fixed || 0) + 1
    localStorage.setItem("donation-panel-clicks", JSON.stringify(clicks))

    // Open donation URL
    window.open(donationUrl, "_blank")
  }

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem("fixed-donation-panel-dismissed", "true")
  }

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  if (!mounted || !isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div
          className={`relative rounded-xl shadow-lg border backdrop-blur-sm ${
            theme === "dark" ? "bg-gray-800/95 border-gray-600/50 shadow-2xl" : "bg-white/90 border-gray-200/50"
          }`}
          layout
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-500/20 hover:bg-gray-500/30"
            onClick={handleDismiss}
          >
            <X className="h-3 w-3" />
          </Button>

          <AnimatePresence mode="wait">
            {!isExpanded ? (
              // Collapsed state - just the heart icon
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-3"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-12 w-12 rounded-full ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-purple-600/20 to-cyan-600/20 hover:from-purple-600/30 hover:to-cyan-600/30"
                      : "bg-gradient-to-r from-purple-500/10 to-cyan-500/10 hover:from-purple-500/20 hover:to-cyan-500/20"
                  }`}
                  onClick={handleToggleExpand}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                  </motion.div>
                </Button>
              </motion.div>
            ) : (
              // Expanded state - full donation panel
              <motion.div
                key="expanded"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`p-4 max-w-xs ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}
              >
                <div className="flex items-start gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-10 w-10 rounded-full flex-shrink-0 ${
                      theme === "dark"
                        ? "bg-purple-500/30 hover:bg-purple-500/40 border border-purple-400/30"
                        : "bg-gradient-to-r from-purple-500/20 to-cyan-500/20"
                    }`}
                    onClick={handleToggleExpand}
                  >
                    <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                  </Button>

                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>
                      Support vitae.uno
                    </h3>
                    <p
                      className={`text-xs mb-3 leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                    >
                      Help us keep this tool free for everyone
                    </p>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-xs px-3 py-1 h-7"
                        onClick={handleDonate}
                      >
                        <Heart className="h-3 w-3 mr-1" />
                        Donate
                      </Button>

                      <Button variant="ghost" size="sm" className="text-xs px-2 py-1 h-7" onClick={handleToggleExpand}>
                        Later
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
