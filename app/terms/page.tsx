import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, AlertTriangle, Info, HelpCircle } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { LayoutWrapper } from "@/components/layout-wrapper"

export default function TermsOfService() {
  const lastUpdated = "April 9, 2024"

  // Schema.org JSON-LD data for the terms page
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service - vitae.uno",
    description: "vitae.uno's terms of service - understand the terms for using our free resume builder tool.",
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
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-6">Last updated: {lastUpdated}</p>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-500" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Welcome to vitae.uno, a free resume builder tool. By using our service, you agree to these Terms of
                Service. Please read them carefully.
              </p>
              <p>
                vitae.uno is provided as a free service with no warranties or guarantees. We aim to provide a helpful
                tool for creating professional resumes without collecting your personal data.
              </p>
            </CardContent>
          </Card>

          {/* Use of Service */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-purple-500" />
                Use of Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Our resume builder is intended for personal use to create professional resumes and CVs. By using
                vitae.uno, you agree to:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Use the service for lawful purposes only</li>
                <li>Not attempt to disrupt or compromise the security of the service</li>
                <li>
                  Not use automated systems to access the service in a manner that sends more requests than a human
                  could reasonably produce
                </li>
                <li>Take responsibility for the content you include in your resume</li>
              </ul>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-500" />
                Intellectual Property
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                The content, organization, graphics, design, and other matters related to vitae.uno are protected under
                applicable copyrights and other proprietary laws. The copying, redistribution, use, or publication of
                any such matters or any part of the service is prohibited.
              </p>
              <p>
                The resumes you create using our service belong to you. We claim no ownership over the content you
                generate using our tool.
              </p>
            </CardContent>
          </Card>

          {/* Disclaimer of Warranties */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-purple-500" />
                Disclaimer of Warranties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                vitae.uno is provided "as is" without any warranties, expressed or implied. We do not guarantee that:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>The service will be uninterrupted or error-free</li>
                <li>Resumes created will lead to employment opportunities</li>
                <li>The service will meet all user requirements</li>
                <li>Any errors in the service will be corrected</li>
              </ul>
              <p>We strive to provide a reliable service but cannot guarantee its availability at all times.</p>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-purple-500" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                In no event shall vitae.uno, its operators, or any involved parties be liable for any damages
                (including, without limitation, damages for loss of data or profit, or due to business interruption)
                arising out of the use or inability to use the materials on vitae.uno, even if we have been notified of
                the possibility of such damage.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-purple-500" />
                Changes to Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We reserve the right to modify these terms at any time. We will indicate at the top of this page when
                these terms were last updated. Your continued use of the service after any changes indicates your these
                terms were last updated. Your continued use of the service after any changes indicates your acceptance
                of the new terms.
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
                If you have any questions about these Terms of Service, please contact us at{" "}
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
