import ResumeBuilder from "@/components/resume-builder"
import { LayoutWrapper } from "@/components/layout-wrapper"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Create your professional resume with our free, privacy-focused resume builder",
}

export default function BuilderPage() {
  return (
    <LayoutWrapper>
      <ResumeBuilder />
    </LayoutWrapper>
  )
}
