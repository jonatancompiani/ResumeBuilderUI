import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "vitae.uno - Terms of Service"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
  const interSemiBold = await fetch(
    new URL("https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap"),
  ).then((res) => res.arrayBuffer())

  const pacificoRegular = await fetch(
    new URL("https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ-6H6Mk.woff2"),
  ).then((res) => res.arrayBuffer())

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

      {/* Document icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.2)",
          marginBottom: 30,
        }}
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      </div>

      <div
        style={{
          fontFamily: '"Pacifico"',
          fontSize: 60,
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
        Terms of Service
      </div>
      <div
        style={{
          fontSize: 24,
          maxWidth: "80%",
          textAlign: "center",
          opacity: 0.9,
        }}
      >
        Our commitment to providing a free, reliable resume builder service.
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
