"use client"

import { usePathname } from "next/navigation"
import { HeaderLogo } from "@/components/header-logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto py-4 px-4">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <HeaderLogo />
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
