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
    console.log("External API response headers:", Object.fromEntries(response.headers.entries()))

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
    console.log("Response content type:", contentType)

    if (contentType && contentType.includes("application/json")) {
      // If the response is JSON, it might contain a base64 string
      const data = await response.json()
      console.log("Received JSON response, checking for PDF data...")

      // Handle different possible response structures
      let pdfData = null
      if (typeof data === "string") {
        pdfData = data
      } else if (data.pdfData) {
        pdfData = data.pdfData
      } else if (data.data) {
        pdfData = data.data
      } else if (Array.isArray(data) && data.length > 0) {
        pdfData = data[0]
      } else if (data.result) {
        pdfData = data.result
      }

      if (!pdfData) {
        console.error("No PDF data found in response:", data)
        return NextResponse.json({ error: "No PDF data received from server" }, { status: 500 })
      }

      // Clean the base64 string - remove any whitespace, newlines, or data URL prefixes
      const cleanedPdfData = pdfData
        .replace(/^data:application\/pdf;base64,/, "") // Remove data URL prefix if present
        .replace(/\s/g, "") // Remove all whitespace
        .replace(/\n/g, "") // Remove newlines

      console.log("PDF data length:", cleanedPdfData.length)
      console.log("First 50 chars of PDF data:", cleanedPdfData.substring(0, 50))

      // Validate base64 string
      if (!/^[A-Za-z0-9+/]*={0,2}$/.test(cleanedPdfData)) {
        console.error("Invalid base64 string format")
        return NextResponse.json({ error: "Invalid PDF data format received" }, { status: 500 })
      }

      return NextResponse.json({ success: true, pdfData: cleanedPdfData })
    } else {
      // Handle binary PDF response
      console.log("Handling binary PDF response")
      const pdfBuffer = await response.arrayBuffer()

      // Return the PDF with appropriate headers
      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="resume.pdf"`,
          "Cache-Control": "no-cache",
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
