"use client"
import { VitaeUnoLogo } from "./vitae-uno-logo"
import Link from "next/link"
import { useMobile } from "@/hooks/use-mobile"

export function HeaderLogo() {
  const isMobile = useMobile()

  return (
    <Link href="/" className="block w-full hover:opacity-90 transition-opacity">
      <VitaeUnoLogo size={isMobile ? "md" : "lg"} />
    </Link>
  )
}
