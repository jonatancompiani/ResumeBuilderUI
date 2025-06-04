import Link from "next/link"
import { VitaeUnoLogo } from "./vitae-uno-logo"
import { SocialShare } from "./social-share"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-12 py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and copyright */}
          <div className="flex flex-col items-center md:items-start">
            <VitaeUnoLogo size="sm" variant="compact" className="mb-4" />
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} vitae.uno | All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-2 flex items-center">
              <a href="mailto:jonatan.development@gmail.com" className="hover:underline">
                jonatan.development@gmail.com
              </a>
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-medium mb-3">Site Links</h3>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/builder" className="hover:underline">
                Resume Builder
              </Link>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:underline">
                Terms of Service
              </Link>
              <Link href="/brand" className="hover:underline">
                Brand Assets
              </Link>
            </div>
          </div>

          {/* Share */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-medium mb-3">Share</h3>
            <p className="text-sm text-muted-foreground mb-3">Help others discover this free resume builder</p>
            <SocialShare
              title="vitae.uno | Free Resume Builder"
              description="Create professional resumes in minutes. No signup required."
              iconsOnly={true}
              className="justify-center md:justify-start"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
