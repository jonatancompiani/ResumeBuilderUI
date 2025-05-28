import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VitaeUnoLogo } from "@/components/vitae-uno-logo"
import { LayoutWrapper } from "@/components/layout-wrapper"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Brand Assets",
  description: "Official brand assets and logo guidelines for vitae.uno - the free, privacy-focused resume builder.",
  alternates: {
    canonical: "/brand",
  },
}

export default function BrandPage() {
  return (
    <LayoutWrapper>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">vitae.uno Brand Assets</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-10">
          <Card>
            <CardHeader className="p-3 sm:p-4">
              <CardTitle className="text-base sm:text-lg">Logo - Light Theme</CardTitle>
            </CardHeader>
            <CardContent className="bg-white p-4 sm:p-10 flex justify-center items-center rounded-b-lg">
              <VitaeUnoLogo size="md" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-3 sm:p-4">
              <CardTitle className="text-base sm:text-lg">Logo - Dark Theme</CardTitle>
            </CardHeader>
            <CardContent className="bg-gray-900 p-4 sm:p-10 flex justify-center items-center rounded-b-lg">
              <VitaeUnoLogo size="md" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-10">
          <Card>
            <CardHeader className="p-3 sm:p-4">
              <CardTitle className="text-base sm:text-lg">Icon Only</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center p-4 sm:p-6">
              <VitaeUnoLogo size="md" variant="icon" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-3 sm:p-4">
              <CardTitle className="text-base sm:text-lg">Favicon</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center p-4 sm:p-6">
              <img src="/favicon.svg" alt="vitae.uno favicon" className="w-12 h-12 sm:w-16 sm:h-16" />
            </CardContent>
          </Card>

          <Card className="sm:col-span-2 md:col-span-1">
            <CardHeader className="p-3 sm:p-4">
              <CardTitle className="text-base sm:text-lg">Small Logo</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center p-4 sm:p-6">
              <VitaeUnoLogo size="sm" />
            </CardContent>
          </Card>
        </div>
      </div>
    </LayoutWrapper>
  )
}
