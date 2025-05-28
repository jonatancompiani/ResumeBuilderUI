"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LayoutWrapper } from "@/components/layout-wrapper"

// Note: Since this is a client component, we need to use a separate metadata file
// We'll create that next

export default function DonationStats() {
  const [impressions, setImpressions] = useState<Record<string, number>>({})
  const [clicks, setClicks] = useState<Record<string, number>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Load stats from localStorage
    const storedImpressions = localStorage.getItem("donation-banner-impressions")
    const storedClicks = localStorage.getItem("donation-banner-clicks")

    if (storedImpressions) {
      setImpressions(JSON.parse(storedImpressions))
    }

    if (storedClicks) {
      setClicks(JSON.parse(storedClicks))
    }
  }, [])

  const resetStats = () => {
    localStorage.removeItem("donation-banner-impressions")
    localStorage.removeItem("donation-banner-clicks")
    setImpressions({})
    setClicks({})
  }

  const resetDismissals = () => {
    localStorage.removeItem("donation-banner-header-dismissed")
    localStorage.removeItem("donation-banner-footer-dismissed")
    localStorage.removeItem("donation-banner-preview-dismissed")
    alert("Banner dismissals have been reset. Refresh the page to see the banners again.")
  }

  if (!mounted) return null

  const calculateCTR = (position: string) => {
    const positionImpressions = impressions[position] || 0
    const positionClicks = clicks[position] || 0

    if (positionImpressions === 0) return "0%"

    return `${((positionClicks / positionImpressions) * 100).toFixed(2)}%`
  }

  const positions = ["header", "footer", "preview"]

  return (
    <LayoutWrapper>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Donation Banner Statistics</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 sm:mb-8">
          {positions.map((position) => (
            <Card key={position}>
              <CardHeader className="p-3 sm:p-4">
                <CardTitle className="capitalize text-base sm:text-lg">{position} Banner</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Impressions:</span>
                    <span>{impressions[position] || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Clicks:</span>
                    <span>{clicks[position] || 0}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>CTR:</span>
                    <span>{calculateCTR(position)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 sm:gap-4">
          <Button variant="outline" onClick={resetStats} className="text-xs sm:text-sm">
            Reset Statistics
          </Button>
          <Button variant="outline" onClick={resetDismissals} className="text-xs sm:text-sm">
            Reset Banner Dismissals
          </Button>
        </div>
      </div>
    </LayoutWrapper>
  )
}
