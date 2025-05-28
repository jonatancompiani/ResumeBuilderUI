import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import type { ReactNode } from "react"

interface LayoutWrapperProps {
  children: ReactNode
  showBreadcrumbs?: boolean
  isLandingPage?: boolean
}

export function LayoutWrapper({
  children,
  showBreadcrumbs = true,
  isLandingPage = false,
}: LayoutWrapperProps) {
  return (
    <>
      <Header />
      <main className={`container mx-auto ${isLandingPage ? "px-0" : "px-3 sm:px-4"} py-6 sm:py-10`}>
        {showBreadcrumbs && <Breadcrumb />}
        {children}
      </main>
      <Footer />
    </>
  )
}
