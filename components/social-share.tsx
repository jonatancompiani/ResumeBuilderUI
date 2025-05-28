"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Linkedin, Twitter, LinkIcon, Copy } from "lucide-react"
import { useState, useEffect } from "react"

interface SocialShareProps {
  title: string
  description?: string
  url?: string
  className?: string
  iconsOnly?: boolean
}

export function SocialShare({ title, description, url, className = "", iconsOnly = true }: SocialShareProps) {
  const [currentUrl, setCurrentUrl] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Get the current URL when component mounts
    if (typeof window !== "undefined") {
      setCurrentUrl(url || window.location.href)
    }
  }, [url])

  const shareText = description || title

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => window.open(shareLinks.facebook, "_blank", "width=600,height=400")}
        aria-label="Share on Facebook"
        className="h-8 w-8"
      >
        <Facebook className="h-4 w-4" />
        {!iconsOnly && <span className="ml-2">Facebook</span>}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => window.open(shareLinks.twitter, "_blank", "width=600,height=400")}
        aria-label="Share on Twitter"
        className="h-8 w-8"
      >
        <Twitter className="h-4 w-4" />
        {!iconsOnly && <span className="ml-2">Twitter</span>}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => window.open(shareLinks.linkedin, "_blank", "width=600,height=400")}
        aria-label="Share on LinkedIn"
        className="h-8 w-8"
      >
        <Linkedin className="h-4 w-4" />
        {!iconsOnly && <span className="ml-2">LinkedIn</span>}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={copyToClipboard}
        aria-label={copied ? "Link copied" : "Copy link"}
        className="h-8 w-8"
      >
        {copied ? <Copy className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
        {!iconsOnly && <span className="ml-2">{copied ? "Copied!" : "Copy Link"}</span>}
      </Button>
    </div>
  )
}
