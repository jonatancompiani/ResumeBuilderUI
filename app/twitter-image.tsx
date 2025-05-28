import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "vitae.uno - Free Resume Builder"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
    let interSemiBold
  let pacificoRegular

  try {
    interSemiBold = await fetch(new URL("https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap")).then(
      (res) => res.arrayBuffer(),
    )
  } catch (e) {
    console.error("Failed to load Inter font:", e)
    // Fallback to system fonts if needed
  }

  try {
    pacificoRegular = await fetch(
      new URL("https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ-6H6Mk.woff2"),
    ).then((res) => res.arrayBuffer())
  } catch (e) {
    console.error("Failed to load Pacifico font:", e)
    // Fallback to system fonts if needed
  }


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
        fontFamily: '"Inter"',
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
          fontFamily: '"Pacifico"',
          fontSize: 80,
          marginBottom: 20,
          textShadow: "0 2px 10px rgba(0,0,0,0.2)",
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
      fonts: [
        {
          name: "Inter",
          data: interSemiBold,
          style: "normal",
          weight: 600,
        },
        {
          name: "Pacifico",
          data: pacificoRegular,
          style: "normal",
          weight: 400,
        },
      ],
    },
  )
}
