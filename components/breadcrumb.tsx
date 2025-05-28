"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { usePathname } from "next/navigation"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  const pathname = usePathname()

  // If no items are provided, generate them from the pathname
  const breadcrumbItems = items || generateBreadcrumbItems(pathname)

  if (pathname === "/") return null // Don't show breadcrumbs on home page

  return (
    <nav aria-label="Breadcrumb" className={`mb-4 sm:mb-6 ${className}`}>
      <ol className="flex flex-wrap items-center text-sm text-muted-foreground">
        <li className="flex items-center">
          <Link href="/" className="flex items-center hover:text-foreground">
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1" aria-hidden="true" />
            {item.href && index < breadcrumbItems.length - 1 ? (
              <Link href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Helper function to generate breadcrumb items from pathname
function generateBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  if (pathname === "/") return []

  const segments = pathname.split("/").filter(Boolean)

  return segments.map((segment, index) => {
    // Format the segment for display (capitalize, replace hyphens with spaces)
    const label = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    // Create href for all but the last segment
    const href = index < segments.length - 1 ? `/${segments.slice(0, index + 1).join("/")}` : undefined

    return { label, href }
  })
}
