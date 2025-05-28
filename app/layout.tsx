import type React from "react"
import type { Metadata } from "next"
import { Inter, Pacifico } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SeoMonitor } from "@/components/seo-monitor"

const inter = Inter({ subsets: ["latin"] })
const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
})

// Define primary keywords for the application
const keywords = [
  "resume builder",
  "free resume creator",
  "CV generator",
  "professional resume",
  "job application tool",
  "online resume maker",
  "no-signup resume builder",
  "privacy-focused resume tool",
]

// Define base URL for absolute URLs
const baseUrl = process.env.NEXT_PUBLIC_URL || "https://vitae.uno"

export const metadata: Metadata = {
  title: {
    default: "vitae.uno | Free Resume Builder",
    template: "%s | vitae.uno",
  },
  description:
    "Create professional resumes and CVs easily with vitae.uno - a free, privacy-focused resume builder with no signup required. Generate, download, and apply with confidence.",
  keywords: keywords.join(", "),
  authors: [{ name: "vitae.uno Team" }],
  creator: "vitae.uno",
  publisher: "vitae.uno",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vitae.uno",
    title: "vitae.uno | Free Resume Builder",
    description:
      "Create professional resumes and CVs easily with vitae.uno - a free, privacy-focused resume builder with no signup required.",
    siteName: "vitae.uno",
    images: [
      {
        url: "https://vitae.uno/opengraph-image", // sem query param
        width: 1200,
        height: 630,
        alt: "vitae.uno - Free Resume Builder",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "vitae.uno | Free Resume Builder",
    description:
      "Create professional resumes and CVs easily with vitae.uno - a free, privacy-focused resume builder with no signup required.",
    images: [`${baseUrl}/twitter-image`],
    creator: "@vitae_uno",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={pacifico.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
          <SeoMonitor />
        </ThemeProvider>
      </body>
    </html>
  )
}
