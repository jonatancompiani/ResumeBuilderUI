import { NextResponse } from "next/server"
import { JSDOM } from "jsdom"

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Fetch the HTML content
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OGBot/1.0; +https://vitae.uno)",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`)
    }

    const html = await response.text()
    const dom = new JSDOM(html)
    const document = dom.window.document

    // Extract Open Graph and Twitter Card metadata
    const getMetaContent = (property: string, attribute = "property") => {
      const element = document.querySelector(`meta[${attribute}="${property}"]`)
      return element?.getAttribute("content") || ""
    }

    const ogData = {
      title:
        getMetaContent("og:title") ||
        getMetaContent("twitter:title", "name") ||
        document.querySelector("title")?.textContent ||
        "",
      description:
        getMetaContent("og:description") ||
        getMetaContent("twitter:description", "name") ||
        getMetaContent("description", "name") ||
        "",
      ogImage: getMetaContent("og:image"),
      twitterImage: getMetaContent("twitter:image", "name") || getMetaContent("og:image"),
      url: getMetaContent("og:url") || url,
      type: getMetaContent("og:type") || "website",
      siteName: getMetaContent("og:site_name"),
      twitterCard: getMetaContent("twitter:card", "name") || "summary_large_image",
    }

    // Make image URLs absolute if they're relative
    const baseUrl = new URL(url).origin
    if (ogData.ogImage && !ogData.ogImage.startsWith("http")) {
      ogData.ogImage = new URL(ogData.ogImage, baseUrl).toString()
    }
    if (ogData.twitterImage && !ogData.twitterImage.startsWith("http")) {
      ogData.twitterImage = new URL(ogData.twitterImage, baseUrl).toString()
    }

    return NextResponse.json(ogData)
  } catch (error) {
    console.error("Error fetching OG data:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch Open Graph data" }, { status: 500 })
  }
}
