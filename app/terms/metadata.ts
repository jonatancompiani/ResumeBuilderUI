import type { Metadata } from "next"

// Define base URL for absolute URLs
const baseUrl = process.env.NEXT_PUBLIC_URL || "https://vitae.uno"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "vitae.uno's terms of service - understand the terms for using our free resume builder tool with no data collection or signup required.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | vitae.uno",
    description:
      "Understand the terms for using our free resume builder tool with no data collection or signup required.",
    url: "/terms",
    images: [
      {
        url: `${baseUrl}/terms/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "vitae.uno - Terms of Service",
      },
    ],
  },
  twitter: {
    title: "Terms of Service | vitae.uno",
    description:
      "Understand the terms for using our free resume builder tool with no data collection or signup required.",
    images: [`${baseUrl}/terms/opengraph-image.png`],
  },
}
