"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function SeoMonitor() {
  const pathname = usePathname()

  useEffect(() => {
    // This is where you would typically integrate with an analytics service
    // For demonstration, we'll just log to console
    console.log(`Page viewed: ${pathname}`)

    // Example of how you might track this with Google Analytics
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore
      window.gtag("config", "GA_MEASUREMENT_ID", {
        page_path: pathname,
      })
    }

    // You could also track page performance metrics
    if (typeof window !== "undefined" && "performance" in window) {
      // Wait for page to fully load
      window.addEventListener("load", () => {
        // Get performance metrics
        const perfData = window.performance.timing
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart

        console.log(`Page load time: ${pageLoadTime}ms`)

        // Send this data to your analytics service
      })
    }
  }, [pathname])

  return null // This component doesn't render anything
}
