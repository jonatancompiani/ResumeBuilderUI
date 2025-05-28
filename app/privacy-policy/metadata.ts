import type { Metadata } from "next"

// Define base URL for absolute URLs
const baseUrl = process.env.NEXT_PUBLIC_URL || "https://vitae.uno"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "vitae.uno's privacy policy - we don't collect, store, or share any of your personal data. Learn how our privacy-focused resume builder protects your information.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | vitae.uno",
    description:
      "We don't collect, store, or share any of your personal data. Learn how our privacy-focused resume builder protects your information.",
    url: "/privacy-policy",
    images: [
      {
        url: `${baseUrl}/privacy-policy/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "vitae.uno - Privacy Policy",
      },
    ],
  },
  twitter: {
    title: "Privacy Policy | vitae.uno",
    description:
      "We don't collect, store, or share any of your personal data. Learn how our privacy-focused resume builder protects your information.",
    images: [`${baseUrl}/privacy-policy/opengraph-image.png`],
  },
}
