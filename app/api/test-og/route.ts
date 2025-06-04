import { NextResponse } from "next/server"

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000"

    // Test the Open Graph image endpoint
    const ogImageUrl = `${baseUrl}/opengraph-image`
    const twitterImageUrl = `${baseUrl}/twitter-image`

    console.log("Testing OG image URL:", ogImageUrl)
    console.log("Testing Twitter image URL:", twitterImageUrl)

    const ogResponse = await fetch(ogImageUrl)
    const twitterResponse = await fetch(twitterImageUrl)

    return NextResponse.json({
      ogImage: {
        url: ogImageUrl,
        status: ogResponse.status,
        contentType: ogResponse.headers.get("content-type"),
        ok: ogResponse.ok,
      },
      twitterImage: {
        url: twitterImageUrl,
        status: twitterResponse.status,
        contentType: twitterResponse.headers.get("content-type"),
        ok: twitterResponse.ok,
      },
    })
  } catch (error) {
    console.error("Error testing OG images:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
