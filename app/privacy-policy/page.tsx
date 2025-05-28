import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, Server, Globe } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { LayoutWrapper } from "@/components/layout-wrapper"

export default function PrivacyPolicy() {
  const lastUpdated = "April 9, 2024"

  // Schema.org JSON-LD data for the privacy policy
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy - vitae.uno",
    description: "vitae.uno's privacy policy - we don't collect, store, or share any of your personal data.",
    publisher: {
      "@type": "Organization",
      name: "vitae.uno",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_URL || "https://vitae.uno"}/favicon.svg`,
      },
    },
    dateModified: lastUpdated,
  }

  return (
    <LayoutWrapper>
      <JsonLd data={schemaData} />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-6">Last updated: {lastUpdated}</p>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-500" />
                Our Privacy Commitment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                At vitae.uno, we are committed to protecting your privacy. Our resume builder tool is designed to be
                completely private and secure, operating without collecting, storing, or sharing any of your personal
                data.
              </p>
              <p>
                This privacy policy explains how our application works and our approach to data privacy. We believe in
                transparency and want you to understand exactly how we handle (or rather, don't handle) your
                information.
              </p>
            </CardContent>
          </Card>

          {/* No Data Collection */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-purple-500" />
                No Data Collection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                <strong>We do not collect any personal data.</strong> When you use our resume builder:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Your resume content is processed entirely in your browser</li>
                <li>
                  Your personal information never leaves your device except when you explicitly choose to generate or
                  download your resume
                </li>
                <li>We do not track your usage patterns or behavior</li>
                <li>We do not use cookies to collect information about you</li>
                <li>We do not maintain user accounts or profiles</li>
              </ul>
              <p>
                The only data stored locally on your device is your resume information, which is temporarily saved in
                your browser's local storage to prevent data loss if you accidentally close the page. This data remains
                exclusively on your device and is not accessible to us.
              </p>
            </CardContent>
          </Card>

          {/* How the Application Works */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-purple-500" />
                How Our Application Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Our resume builder operates with privacy by design:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  <strong>Resume Generation:</strong> When you click "Generate Resume," your data is sent securely to
                  our resume generation service, processed to create your resume, and immediately discarded after the
                  PDF or image is returned to your browser.
                </li>
                <li>
                  <strong>Local Storage:</strong> Your form data is temporarily stored in your browser's local storage
                  only, allowing you to continue where you left off if you close the page. This data never leaves your
                  device unless you explicitly generate a resume.
                </li>
                <li>
                  <strong>No Backend Database:</strong> We do not maintain any database to store your information. There
                  is simply no mechanism in our application to retain your data.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-500" />
                Third-Party Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Our application uses minimal third-party services:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  <strong>LinkedIn Integration:</strong> If you choose to import data from LinkedIn, you will be
                  redirected to LinkedIn's authentication service. We only receive the data you explicitly authorize
                  LinkedIn to share, and we do not store this data beyond your current session.
                </li>
                <li>
                  <strong>Resume Generation API:</strong> We use a secure API to generate your resume. Your data is
                  transmitted securely, used only for the generation process, and is not stored after the process
                  completes.
                </li>
                <li>
                  <strong>Donation Processing:</strong> If you choose to make a donation, payment processing is handled
                  by PayPal. We do not receive or store your payment information.
                </li>
              </ul>
              <p>
                These services are used solely to provide the functionality you request, and none involve the persistent
                storage of your personal information.
              </p>
            </CardContent>
          </Card>

          {/* Your Rights and Choices */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-500" />
                Your Rights and Choices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Since we don't collect or store your data, there is no need for:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Data access requests</li>
                <li>Data deletion requests</li>
                <li>Data correction procedures</li>
                <li>Data portability mechanisms</li>
              </ul>
              <p className="mb-4">If you wish to clear any locally stored data from your browser, you can:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Clear your browser's local storage</li>
                <li>Use your browser's incognito/private mode</li>
              </ul>
            </CardContent>
          </Card>

          {/* Changes to Privacy Policy */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We may update this privacy policy from time to time to reflect changes in our practices or for other
                operational, legal, or regulatory reasons. The date at the top of this policy indicates when it was last
                updated. We encourage you to review this policy periodically to stay informed about our privacy
                practices.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                If you have any questions or concerns about this privacy policy or our privacy practices, please contact
                us at{" "}
                <a
                  href="mailto:jonatan.development@gmail.com"
                  className="text-purple-600 dark:text-purple-400 hover:underline"
                >
                  jonatan.development@gmail.com
                </a>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </LayoutWrapper>
  )
}
