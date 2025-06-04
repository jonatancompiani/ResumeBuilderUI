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
          console.log('LinkedIn callback loaded');
          console.log('Code:', ${code ? `'${code}'` : "null"});
          console.log('Error:', ${error ? `'${error}'` : "null"});
          console.log('Opener exists:', !!window.opener);
          
          if (window.opener && !window.opener.closed) {
            try {
              // Send message to opener with the code or error
              window.opener.postMessage(
                { 
                  type: 'LINKEDIN_AUTH_CALLBACK', 
                  code: ${code ? `'${code}'` : "null"}, 
                  error: ${error ? `'${error}'` : "null"} 
                }, 
                window.location.origin
              );
              console.log('Message sent to opener');
              // Close the popup after a short delay
              setTimeout(() => {
                window.close();
              }, 500);
            } catch (e) {
              console.error('Error sending message to opener:', e);
              // Fallback: redirect to main page with parameters
              window.location.href = '${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/builder?${
                code ? `linkedin_code=${code}` : error ? `linkedin_error=${error}` : "linkedin_error=message_failed"
              }';
            }
          } else {
            console.log('No opener found, redirecting to main page');
            // If no opener, redirect to the builder page with parameters
            window.location.href = '${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/builder?${
              code ? `linkedin_code=${code}` : error ? `linkedin_error=${error}` : "linkedin_error=no_opener"
            }';
          }
        };
      </script>
    </head>
    <body>
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
        <h2>LinkedIn Authentication</h2>
        <p>Completing authentication, please wait...</p>
        <div style="margin-top: 20px;">
          <div style="display: inline-block; width: 20px; height: 20px; border: 3px solid #f3f3f3; border-top: 3px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        </div>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      </div>
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
