import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Get the request data
    const requestData = await request.json()

    console.log("Sending request to external API")

    // Forward the request to the external API
    const externalApiUrl = "https://freeresumebuilder.azurewebsites.net/Doc/Preview"

    const response = await fetch(externalApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestData),
      credentials: "omit",
      cache: "no-cache",
    })

    console.log("External API response status:", response.status)

    if (!response.ok) {
      let errorMessage
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || `External API responded with status: ${response.status}`
      } catch (e) {
        errorMessage = `External API responded with status: ${response.status}`
      }

      console.error("Error from external API:", errorMessage)
      return NextResponse.json({ error: errorMessage }, { status: response.status })
    }

    // Parse the JSON response which is an array containing a base64 string
    const responseData = await response.json()

    // The response is an array with a single base64 string
    if (Array.isArray(responseData) && responseData.length > 0) {
      const base64Image = responseData[0]

      // Return the base64 image data
      return NextResponse.json({
        success: true,
        imageData: base64Image,
      })
    } else {
      console.error("Unexpected response format:", responseData)
      return NextResponse.json(
        {
          error: "Unexpected response format from resume API",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error proxying to resume API:", error)
    return NextResponse.json(
      {
        error: error.message || "Failed to generate resume",
      },
      { status: 500 },
    )
  }
}
