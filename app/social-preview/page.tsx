import { SocialPreviewTester } from "@/components/social-preview-tester"
import { LayoutWrapper } from "@/components/layout-wrapper"

export const metadata = {
  title: "Social Preview Tester",
  description: "Test how vitae.uno links appear when shared on social media platforms",
}

export default function SocialPreviewPage() {
  return (
    <LayoutWrapper>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Social Media Preview Tester</h1>

        <div className="mb-8">
          <p className="mb-4">
            This tool helps you test how vitae.uno links will appear when shared on various social media platforms.
            Social media previews are generated using Open Graph and Twitter Card metadata.
          </p>
          <p>
            Select a page to test, copy the URL, and use the provided tools to see how the link will appear when shared.
          </p>
        </div>

        <SocialPreviewTester />

        <div className="mt-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">How to Test Social Media Previews</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Enter a path (e.g., /privacy-policy) or leave blank for the homepage</li>
              <li>Copy the full URL</li>
              <li>Select a social media platform tab</li>
              <li>Click the button to open the preview tool for that platform</li>
              <li>Paste the URL into the tool and check the preview</li>
            </ol>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Troubleshooting</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Facebook:</strong> If the preview doesn't update, click the "Scrape Again" button in the
                Facebook Sharing Debugger
              </li>
              <li>
                <strong>Twitter:</strong> Twitter Card Validator shows a preview immediately
              </li>
              <li>
                <strong>LinkedIn:</strong> LinkedIn may cache previews for up to 7 days
              </li>
              <li>
                <strong>General:</strong> Social media platforms cache link previews. If you've updated the metadata but
                still see old previews, you may need to use the platform's cache clearing tools
              </li>
            </ul>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
