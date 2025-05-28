"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink } from "lucide-react"

export function SocialPreviewTester() {
  const [url, setUrl] = useState("")
  const [copied, setCopied] = useState(false)

  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://vitae.uno"
  const fullUrl = url ? `${baseUrl}${url.startsWith("/") ? url : `/${url}`}` : baseUrl

  const previewTools = [
    {
      name: "Facebook",
      url: "https://developers.facebook.com/tools/debug/",
      description: "Facebook Sharing Debugger",
    },
    {
      name: "Twitter",
      url: "https://cards-dev.twitter.com/validator",
      description: "Twitter Card Validator",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/post-inspector/",
      description: "LinkedIn Post Inspector",
    },
    {
      name: "OpenGraph",
      url: "https://www.opengraph.xyz/",
      description: "Open Graph Checker",
    },
  ]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Social Media Preview Tester</CardTitle>
        <CardDescription>Test how your links will appear when shared on social media platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Input
                placeholder="Enter path (e.g., /privacy-policy)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button onClick={copyToClipboard} variant="outline">
              {copied ? "Copied!" : "Copy URL"}
              <Copy className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm font-mono break-all">{fullUrl}</p>
          </div>

          <Tabs defaultValue="facebook">
            <TabsList className="grid grid-cols-4 w-full">
              {previewTools.map((tool) => (
                <TabsTrigger key={tool.name} value={tool.name.toLowerCase()}>
                  {tool.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {previewTools.map((tool) => (
              <TabsContent key={tool.name} value={tool.name.toLowerCase()}>
                <Card>
                  <CardHeader>
                    <CardTitle>{tool.name} Preview Tool</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm">
                      To test how your link will appear on {tool.name}, click the button below to open the {tool.name}{" "}
                      preview tool. Then paste the URL above into the tool.
                    </p>
                    <Button asChild>
                      <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        Open {tool.name} Tool
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
