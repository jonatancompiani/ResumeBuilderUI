"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { ExternalLink, Copy, Check, RefreshCw } from "lucide-react"

export function SocialPreviewDebugger() {
  const [currentUrl, setCurrentUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [ogData, setOgData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Get the current URL when component mounts
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href)
    }
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const fetchOgData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // This is a mock function since we can't actually fetch OG data client-side due to CORS
      // In a real implementation, you would use a server endpoint to fetch this data
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network request

      // Mock data
      setOgData({
        title: "vitae.uno | Free Resume Builder",
        description: "Create professional resumes and CVs easily with vitae.uno",
        ogImage: `${window.location.origin}/opengraph-image.png`,
        twitterImage: `${window.location.origin}/twitter-image.png`,
        url: currentUrl,
      })
    } catch (err) {
      setError("Failed to fetch Open Graph data. Try using an external validator.")
    } finally {
      setIsLoading(false)
    }
  }

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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Social Preview Debugger</CardTitle>
        <CardDescription>Test and debug how your links appear when shared on social media</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <Input
                value={currentUrl}
                onChange={(e) => setCurrentUrl(e.target.value)}
                placeholder="Enter URL to test"
              />
            </div>
            <Button onClick={copyToClipboard} variant="outline" className="whitespace-nowrap">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied!" : "Copy URL"}
            </Button>
            <Button onClick={fetchOgData} disabled={isLoading} className="whitespace-nowrap">
              {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
              Test URL
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {ogData && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Open Graph Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md overflow-hidden">
                      <img
                        src={ogData.ogImage || "/placeholder.svg"}
                        alt="Open Graph preview"
                        className="w-full h-auto"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=630&width=1200"
                          setError("Failed to load Open Graph image. Check the URL and server configuration.")
                        }}
                      />
                    </div>
                    <p className="text-xs mt-2 text-muted-foreground break-all">{ogData.ogImage}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Twitter Card Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md overflow-hidden">
                      <img
                        src={ogData.twitterImage || "/placeholder.svg"}
                        alt="Twitter Card preview"
                        className="w-full h-auto"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=630&width=1200"
                          setError("Failed to load Twitter Card image. Check the URL and server configuration.")
                        }}
                      />
                    </div>
                    <p className="text-xs mt-2 text-muted-foreground break-all">{ogData.twitterImage}</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Metadata</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Title:</span> {ogData.title}
                    </div>
                    <div>
                      <span className="font-medium">Description:</span> {ogData.description}
                    </div>
                    <div>
                      <span className="font-medium">URL:</span> {ogData.url}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="pt-4 border-t">
            <h3 className="font-medium mb-3">External Validation Tools</h3>
            <Tabs defaultValue="facebook">
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full">
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
                      <CardTitle className="text-base">{tool.name} Preview Tool</CardTitle>
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
        </div>
      </CardContent>
    </Card>
  )
}
