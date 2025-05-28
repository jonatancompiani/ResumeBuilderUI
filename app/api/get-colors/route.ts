import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("Fetching available colors")

    // Forward the request to the external API
    const externalApiUrl = "https://freeresumebuilder.azurewebsites.net/Doc/Colors"

    const response = await fetch(externalApiUrl, {
      method: "GET",
      headers: {
        Accept: "text/plain",
      },
      cache: "no-cache",
    })

    console.log("Colors API response status:", response.status)

    if (!response.ok) {
      let errorMessage
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || `External API responded with status: ${response.status}`
      } catch (e) {
        errorMessage = `External API responded with status: ${response.status}`
      }

      console.error("Error from colors API:", errorMessage)
      return NextResponse.json({ error: errorMessage }, { status: response.status })
    }

    // Parse the JSON response which is an array of color strings
    const colorsData = await response.json()

    // Return the colors data
    return NextResponse.json({
      success: true,
      colors: colorsData,
    })
  } catch (error) {
    console.error("Error fetching colors:", error)
    return NextResponse.json(
      {
        error: error.message || "Failed to fetch colors",
      },
      { status: 500 },
    )
  }
}
