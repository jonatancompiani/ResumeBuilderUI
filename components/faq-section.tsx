"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function FaqSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const faqs = [
    {
      question: "Is vitae.uno completely free to use?",
      answer:
        "Yes, vitae.uno is 100% free to use. There are no hidden fees, subscriptions, or premium features. You can create and download as many resumes as you need without any cost.",
    },
    {
      question: "Do I need to create an account to use vitae.uno?",
      answer:
        "No, you don't need to create an account or sign up to use vitae.uno. Our resume builder is designed to be quick and hassle-free, allowing you to create professional resumes without any registration process.",
    },
    {
      question: "Does vitae.uno collect my personal data?",
      answer:
        "No, vitae.uno does not collect, store, or share any of your personal data. Your resume information is processed entirely in your browser and is never stored on our servers. We are committed to protecting your privacy.",
    },
    {
      question: "What file formats can I download my resume in?",
      answer:
        "You can download your resume as a PDF file, which is the industry standard for job applications and provides the best compatibility with applicant tracking systems.",
    },
    {
      question: "Can I import my LinkedIn profile to vitae.uno?",
      answer:
        "Yes, vitae.uno allows you to import your professional information directly from LinkedIn using OpenID Connect. This feature makes it quick and easy to create a resume based on your existing LinkedIn profile.",
    },
    {
      question: "How can I support vitae.uno?",
      answer:
        "If you find vitae.uno helpful, you can support us by making a donation. Your contributions help us maintain and improve this free tool for everyone. There's no obligation to donate, but any support is greatly appreciated.",
    },
    {
      question: "Is my resume ATS-friendly?",
      answer:
        "Yes, resumes created with vitae.uno are designed to be ATS (Applicant Tracking System) friendly. We use a clean, professional layout with standard sections that can be easily parsed by automated systems used by employers.",
    },
    {
      question: "Can I use vitae.uno on my mobile device?",
      answer:
        "vitae.uno is fully responsive and works on all devices including smartphones, tablets, and desktop computers. You can create your resume on the go from any device with a web browser.",
    },
  ]

  if (!mounted) {
    return (
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
          <p className="text-center text-muted-foreground mb-12">
            Find answers to common questions about our resume builder
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
