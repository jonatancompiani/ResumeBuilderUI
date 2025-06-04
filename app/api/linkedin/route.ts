import { NextResponse } from "next/server"

console.log("test")

// LinkedIn OpenID Connect credentials from environment variables
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID || ""
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET || ""
const REDIRECT_URI = process.env.NEXT_PUBLIC_URL
  ? `${process.env.NEXT_PUBLIC_URL}/api/linkedin/callback`
  : "http://localhost:3000/api/linkedin/callback"

export async function GET(request: Request) {
  try {
    console.log("LinkedIn API route called")

    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")

    console.log("Code parameter:", code ? "present" : "not present")

    if (!code) {
      // If no code is provided, return the LinkedIn authorization URL using OpenID Connect
      const state = generateRandomState()
      const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=openid%20profile%20email&state=${state}`
      console.log("Generated auth URL:", authUrl)
      return NextResponse.json({ authUrl, state })
    }

    console.log("Exchanging code for tokens...")

    // Exchange code for tokens (access token and id token)
    const tokenResponse = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET,
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error("Token exchange failed:", tokenResponse.status, errorText)
      throw new Error(`Failed to get access token: ${tokenResponse.status}`)
    }

    console.log("Token exchange successful")

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token
    const idToken = tokenData.id_token

    console.log("Tokens received, decoding ID token...")

    // Decode the ID token to get basic profile information
    const profileData = decodeIdToken(idToken)
    console.log("ID token decoded:", Object.keys(profileData))

    // Use the access token to get additional profile data
    const profileResponse = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!profileResponse.ok) {
      const errorText = await profileResponse.text()
      console.error("Profile fetch failed:", profileResponse.status, errorText)
      throw new Error(`Failed to get profile data: ${profileResponse.status}`)
    }

    console.log("Profile data fetched successfully")

    const additionalProfileData = await profileResponse.json()
    console.log("Additional profile data:", Object.keys(additionalProfileData))

    // Extract LinkedIn profile URL or ID
    let linkedinUrl = ""

    // Try to get LinkedIn ID from the sub field
    if (additionalProfileData.sub) {
      const linkedinId = extractLinkedInId(additionalProfileData.sub)
      if (linkedinId) {
        linkedinUrl = `https://www.linkedin.com/in/${linkedinId}`
      }
    }

    console.log("LinkedIn URL extracted:", linkedinUrl)

    // If we couldn't extract from sub, check if there's a direct URL in the response
    if (!linkedinUrl && additionalProfileData.website) {
      const websites = Array.isArray(additionalProfileData.website)
        ? additionalProfileData.website
        : [additionalProfileData.website]

      const linkedinWebsite = websites.find((site) => typeof site === "string" && site.includes("linkedin.com/in/"))

      if (linkedinWebsite) {
        linkedinUrl = linkedinWebsite
      }
    }

    // Validate and normalize the LinkedIn URL
    if (linkedinUrl) {
      linkedinUrl = normalizeLinkedInUrl(linkedinUrl)
    }

    // Combine data from ID token and userinfo endpoint
    const userData = {
      fullName: additionalProfileData.name || `${profileData.given_name || ""} ${profileData.family_name || ""}`.trim(),
      email: additionalProfileData.email || profileData.email || "",
      profilePicture: additionalProfileData.picture || null,
      // Mock data for positions/experience, education, and skills
      positions: [
        {
          companyName: "Example Company",
          title: "Software Engineer",
          startDate: { month: 1, year: 2020 },
          endDate: null,
          description: "Worked on various web development projects using modern technologies",
        },
      ],
      education: [
        {
          schoolName: "Example University",
          degree: "Bachelor's Degree",
          fieldOfStudy: "Computer Science",
          startDate: { month: 9, year: 2016 },
          endDate: { month: 6, year: 2020 },
        },
      ],
      skills: ["JavaScript", "React", "Node.js", "TypeScript", "Python"],
      linkedinUrl: linkedinUrl,
    }

    console.log("User data prepared successfully")
    return NextResponse.json({ success: true, userData })
  } catch (error) {
    console.error("LinkedIn API error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch LinkedIn data" },
      { status: 500 },
    )
  }
}

// Helper function to generate a random state parameter for CSRF protection
function generateRandomState() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Helper function to decode the JWT ID token
function decodeIdToken(idToken: string) {
  try {
    // Simple JWT decoding (in production, you should validate the signature)
    const base64Url = idToken.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    )

    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Error decoding ID token:", error)
    return {}
  }
}

// Helper function to extract LinkedIn ID from the sub field
function extractLinkedInId(sub: string): string | null {
  try {
    // Handle different formats of the sub field
    if (sub.includes(":")) {
      // Format like "linkedin:member:12345"
      const parts = sub.split(":")
      return parts[parts.length - 1]
    } else if (sub.includes("/")) {
      // Format like "https://www.linkedin.com/in/username"
      const parts = sub.split("/")
      return parts[parts.length - 1]
    }
    // If it's just the ID itself
    return sub
  } catch (error) {
    console.error("Error extracting LinkedIn ID:", error)
    return null
  }
}

// Helper function to validate and normalize LinkedIn URL
function normalizeLinkedInUrl(url: string): string {
  try {
    // Check if it's already a valid URL
    let urlObj: URL
    try {
      urlObj = new URL(url)
    } catch (e) {
      // If not a valid URL, assume it's just the username
      return `https://www.linkedin.com/in/${url}`
    }

    // If it's a valid URL but not a LinkedIn URL
    if (!urlObj.hostname.includes("linkedin.com")) {
      return `https://www.linkedin.com/in/${url}`
    }

    // If it's a LinkedIn URL but doesn't have the /in/ path
    if (!urlObj.pathname.includes("/in/")) {
      const username = urlObj.pathname.split("/").filter(Boolean).pop() || ""
      return `https://www.linkedin.com/in/${username}`
    }

    // It's already a valid LinkedIn profile URL
    return url
  } catch (error) {
    console.error("Error normalizing LinkedIn URL:", error)
    // Return a safe default if all else fails
    return url.startsWith("http") ? url : `https://www.linkedin.com/in/${url}`
  }
}
