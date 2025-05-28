"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Linkedin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"

interface LinkedInImportButtonProps {
  onDataReceived: (data: any) => void
  className?: string
}

export function LinkedInImportButton({ onDataReceived, className = "" }: LinkedInImportButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const popupRef = useRef<Window | null>(null)
  const popupCheckIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()
  const isMobile = useMobile()

  // Handle mounting to avoid window access during SSR
  useEffect(() => {
    setIsMounted(true)

    // Check for LinkedIn code or error in URL on component mount
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get("linkedin_code")
      const error = urlParams.get("linkedin_error")

      if (code) {
        handleLinkedInCode(code)
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname)
      } else if (error) {
        toast({
          title: "LinkedIn Error",
          description: `Failed to connect to LinkedIn: ${error}`,
          variant: "destructive",
        })
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname)
      }
    }

    // Set up message listener for popup communication
    const messageHandler = (event: MessageEvent) => {
      // Verify origin for security
      if (event.origin !== window.location.origin) return

      if (event.data && event.data.type === "LINKEDIN_AUTH_CALLBACK") {
        if (event.data.code) {
          handleLinkedInCode(event.data.code)
        } else if (event.data.error) {
          toast({
            title: "LinkedIn Error",
            description: `Failed to connect to LinkedIn: ${event.data.error}`,
            variant: "destructive",
          })
        }
      }
    }

    window.addEventListener("message", messageHandler)

    return () => {
      window.removeEventListener("message", messageHandler)
      if (popupCheckIntervalRef.current) {
        clearInterval(popupCheckIntervalRef.current)
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const initiateLinkedInAuth = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/linkedin")
      const data = await response.json()

      if (data.authUrl) {
        // For mobile, redirect directly instead of using a popup
        if (isMobile) {
          window.location.href = data.authUrl
          return
        }

        // Open LinkedIn authorization in a popup for desktop
        const width = 600
        const height = 700
        const left = window.innerWidth / 2 - width / 2
        const top = window.innerHeight / 2 - height / 2

        popupRef.current = window.open(
          data.authUrl,
          "linkedin-auth",
          `width=${width},height=${height},top=${top},left=${left}`,
        )

        // Check if popup was blocked
        if (!popupRef.current || popupRef.current.closed || typeof popupRef.current.closed === "undefined") {
          throw new Error("Popup blocked. Please allow popups for this site.")
        }

        // Poll to check if popup is closed
        popupCheckIntervalRef.current = setInterval(() => {
          if (popupRef.current && popupRef.current.closed) {
            clearInterval(popupCheckIntervalRef.current!)
            setIsLoading(false)
          }
        }, 500)
      } else {
        throw new Error("Failed to get LinkedIn authorization URL")
      }
    } catch (error) {
      console.error("LinkedIn auth error:", error)
      toast({
        title: "LinkedIn Error",
        description: error.message || "Failed to connect to LinkedIn. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const handleLinkedInCode = async (code: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/linkedin?code=${code}`)
      const data = await response.json()

      if (data.success && data.userData) {
        // Validate LinkedIn URL before passing it to the form
        if (data.userData.linkedinUrl) {
          try {
            // Basic URL validation
            new URL(data.userData.linkedinUrl)
          } catch (e) {
            // If not a valid URL, prepend https://
            if (!data.userData.linkedinUrl.startsWith("http")) {
              data.userData.linkedinUrl = `https://www.linkedin.com/in/${data.userData.linkedinUrl}`
            }
          }
        }

        toast({
          title: "LinkedIn Connected",
          description: "Your LinkedIn data has been imported successfully.",
        })
        onDataReceived(data.userData)
      } else {
        throw new Error(data.error || "Failed to import LinkedIn data")
      }
    } catch (error) {
      console.error("LinkedIn data error:", error)
      toast({
        title: "LinkedIn Error",
        description: error.message || "Failed to import LinkedIn data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Don't render anything until client-side hydration is complete
  if (!isMounted) return null

  return (
    <Button
      type="button"
      variant="outline"
      onClick={initiateLinkedInAuth}
      disabled={isLoading}
      className={`flex items-center gap-2 bg-[#0077B5] hover:bg-[#006097] text-white hover:text-white text-xs sm:text-sm ${className}`}
    >
      {isLoading ? (
        <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
      ) : (
        <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
      )}
      {isLoading ? "Connecting..." : isMobile ? "LinkedIn Import" : "Sign in with LinkedIn"}
    </Button>
  )
}
