import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "vitae.uno - Free Resume Builder"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
  try {
    return new ImageResponse(
      <div
        style={{
          background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "white",
          position: "relative",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage:
              "radial-gradient(circle at 25% 110%, rgba(255, 255, 255, 0.8) 0%, transparent 70%), radial-gradient(circle at 75% 10%, rgba(255, 255, 255, 0.8) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            fontSize: 80,
            marginBottom: 20,
            textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            fontWeight: "bold",
          }}
        >
          vitae.uno
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Free Resume Builder
        </div>
        <div
          style={{
            fontSize: 24,
            maxWidth: "80%",
            textAlign: "center",
            opacity: 0.9,
          }}
        >
          Create professional resumes in minutes. No signup required.
        </div>
      </div>,
      {
        ...size,
      },
    )
  } catch (error) {
    console.error("Error generating Twitter image:", error)

    // Fallback simple image
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
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        vitae.uno - Free Resume Builder
      </div>,
      { ...size },
    )
  }
}
