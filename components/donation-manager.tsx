"use client"

import { useState, useEffect } from "react"
import { DonationBanner } from "@/components/donation-banner"

export function DonationManager() {
  const [mounted, setMounted] = useState(false)

  // Only render banners after component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Only show the footer banner to avoid duplication */}
      <DonationBanner position="footer" />
    </>
  )
}
