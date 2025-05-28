import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = "image/png"

// Image generation
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "36px",
        fontFamily: "Pacifico",
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "100px",
          marginBottom: "10px", // Adjust for Pacifico baseline
          fontFamily: "'Pacifico', cursive",
        }}
      >
        V
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Pacifico",
          data: await fetch(
            new URL("https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ-6H6Mk.woff2")
          ).then((res) => res.arrayBuffer()),
          weight: 400,
          style: "normal",
        },
      ],
    },
  )
}
