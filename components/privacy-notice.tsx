"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, X } from "lucide-react"
import Link from "next/link"

export function PrivacyNotice() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const hasSeenNotice = localStorage.getItem("privacy-notice-dismissed")
    if (!hasSeenNotice) {
      setIsVisible(true)
    }
  }, [])

  const dismissNotice = () => {
    setIsVisible(false)
    localStorage.setItem("privacy-notice-dismissed", "true")
  }

  if (!isMounted || !isVisible) return null

  return (
    <Card className="relative mb-6 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20">
      <div className="p-4 pr-12">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-sm sm:text-base mb-1">Your Privacy Matters</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
              This resume builder doesn't collect, store, or share any of your data. Everything stays on your device.
            </p>
            <Link href="/privacy-policy">
              <Button variant="link" className="h-auto p-0 text-xs sm:text-sm text-purple-600 dark:text-purple-400">
                Read our privacy policy
              </Button>
            </Link>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-6 w-6"
          onClick={dismissNotice}
          aria-label="Dismiss privacy notice"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </Card>
  )
}
