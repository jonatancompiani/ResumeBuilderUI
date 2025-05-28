import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "vitae.uno - Free Resume Builder"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  try {
    return new ImageResponse(
      <div
        style={{
          background: "#06B6D4",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 48,
        }}
      >
        Test Image 2
      </div>,
      { ...size }
    )
  } catch (error) {
    console.error("Error generating test image:", error)
    throw error
  }
}
