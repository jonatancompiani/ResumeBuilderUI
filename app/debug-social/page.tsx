import { SocialPreviewDebugger } from "@/components/social-preview-debugger"
import { LayoutWrapper } from "@/components/layout-wrapper"

export const metadata = {
  title: "Social Preview Debugger",
  description: "Debug and test social media preview images for vitae.uno",
}

export default function DebugSocialPage() {
  return (
    <LayoutWrapper>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Social Preview Debugger</h1>

        <div className="mb-8">
          <p className="mb-4">
            This tool helps you debug and test how vitae.uno links appear when shared on various social media platforms.
            It checks the Open Graph and Twitter Card metadata and provides links to external validation tools.
          </p>
        </div>

        <SocialPreviewDebugger />

        <div className="mt-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Common Issues with Social Previews</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Relative URLs:</strong> Social media platforms require absolute URLs for images
              </li>
              <li>
                <strong>Caching:</strong> Platforms may cache previews for days or weeks
              </li>
              <li>
                <strong>Image dimensions:</strong> Different platforms have different requirements
              </li>
              <li>
                <strong>Content Security Policy:</strong> CSP headers may block crawlers from accessing images
              </li>
              <li>
                <strong>Server configuration:</strong> The server must properly serve the images with correct MIME types
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Recommended Image Dimensions</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Facebook/Open Graph:</strong> 1200 × 630 pixels (minimum 600 × 315)
              </li>
              <li>
                <strong>Twitter:</strong> 1200 × 675 pixels for large cards
              </li>
              <li>
                <strong>LinkedIn:</strong> 1200 × 627 pixels
              </li>
            </ul>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
