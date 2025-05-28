import { PrivacyNotice } from "@/components/privacy-notice"
import { JsonLd } from "@/components/json-ld"
import { FaqSection } from "@/components/faq-section"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { LandingHero } from "@/components/landing-hero"
import { FeatureSection } from "@/components/feature-section"
import { HowItWorks } from "@/components/how-it-works"
import { FinalCta } from "@/components/final-cta"

export default function Home() {
  // Schema.org JSON-LD data for the resume builder
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "vitae.uno Resume Builder",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Create professional resumes and CVs easily with vitae.uno - a free, privacy-focused resume builder with no signup required.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "156",
    },
    featureList:
      "Free resume builder, No signup required, Privacy-focused, Multiple templates, PDF download, LinkedIn import",
  }

  // FAQ schema data
  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is vitae.uno completely free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, vitae.uno is 100% free to use. There are no hidden fees, subscriptions, or premium features. You can create and download as many resumes as you need without any cost.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to create an account to use vitae.uno?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, you don't need to create an account or sign up to use vitae.uno. Our resume builder is designed to be quick and hassle-free, allowing you to create professional resumes without any registration process.",
        },
      },
      {
        "@type": "Question",
        name: "Does vitae.uno collect my personal data?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, vitae.uno does not collect, store, or share any of your personal data. Your resume information is processed entirely in your browser and is never stored on our servers. We are committed to protecting your privacy.",
        },
      },
      {
        "@type": "Question",
        name: "What file formats can I download my resume in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can download your resume as a PDF file, which is the industry standard for job applications and provides the best compatibility with applicant tracking systems.",
        },
      },
      {
        "@type": "Question",
        name: "Can I import my LinkedIn profile to vitae.uno?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, vitae.uno allows you to import your professional information directly from LinkedIn using OpenID Connect. This feature makes it quick and easy to create a resume based on your existing LinkedIn profile.",
        },
      },
    ],
  }

  return (
    <LayoutWrapper showBreadcrumbs={false} isLandingPage={true}>
      <JsonLd data={schemaData} />
      <JsonLd data={faqSchemaData} />

      {/* Privacy Notice */}
      <PrivacyNotice />

      {/* Hero Section */}
      <LandingHero />

      {/* Features Section */}
      <FeatureSection />

      {/* How It Works */}
      <HowItWorks />

      {/* FAQ Section */}
      <FaqSection />

      {/* Final CTA */}
      <FinalCta />
    </LayoutWrapper>
  )
}
