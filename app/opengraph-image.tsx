import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "vitae.uno - Free Resume Builder"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
 


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

      {/* Resume icon */}
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
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      </div>

      <div
        style={{       fontSize: 80,
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

      {/* Features */}
      <div
        style={{
          display: "flex",
          marginTop: 40,
          gap: 20,
        }}
      >
        {["Free", "Private", "No Signup", "PDF Download"].map((feature) => (
          <div
            key={feature}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              padding: "8px 16px",
              borderRadius: 20,
              fontSize: 18,
            }}
          >
            {feature}
          </div>
        ))}
      </div>
    </div>,
    {...size, },
  )
}
