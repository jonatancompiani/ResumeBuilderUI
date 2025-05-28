import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const error = searchParams.get("error")
    const state = searchParams.get("state") // OpenID Connect returns the state parameter

    // Create an HTML page that will post a message to the opener window and then close itself
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>LinkedIn Authentication</title>
          <script>
            window.onload = function() {
              if (window.opener) {
                // Send message to opener with the code or error
                window.opener.postMessage(
                  { 
                    type: 'LINKEDIN_AUTH_CALLBACK', 
                    code: ${code ? `'${code}'` : "null"}, 
                    error: ${error ? `'${error}'` : "null"} 
                  }, 
                  window.location.origin
                );
                // Close the popup
                window.close();
              } else {
                // If no opener, redirect to the main application
                window.location.href = '${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}?${
                  code ? `linkedin_code=${code}` : error ? `linkedin_error=${error}` : "linkedin_error=no_opener"
                }';
              }
            };
          </script>
        </head>
        <body>
          <p>Completing authentication, please wait...</p>
        </body>
      </html>
    `

    return new NextResponse(htmlContent, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    })
  } catch (error) {
    console.error("LinkedIn callback error:", error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}?linkedin_error=${error.message}`,
    )
  }
}
