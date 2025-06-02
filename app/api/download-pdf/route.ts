import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Get the request data
    const requestData = await request.json()

    console.log("Sending PDF download request to external API")

    // Forward the request to the external API
    const externalApiUrl = "https://freeresumebuilder.azurewebsites.net/document/download"

    const response = await fetch(externalApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf",
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

    // Check the content type of the response
    const contentType = response.headers.get("Content-Type")

    if (contentType && contentType.includes("application/json")) {
      // If the response is JSON, it might contain a base64 string
      const data = await response.json()
      return NextResponse.json({ success: true, pdfData: data || data[0] })
    } else {
      // Get the PDF binary data
      const pdfBuffer = await response.arrayBuffer()

      // Return the PDF with appropriate headers
      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="resume.pdf"`,
        },
      })
    }
  } catch (error) {
    console.error("Error downloading PDF:", error)
    return NextResponse.json(
      {
        error: error.message || "Failed to download PDF",
      },
      { status: 500 },
    )
  }
}
