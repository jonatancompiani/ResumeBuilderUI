"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, FileText, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { ResumeMockup } from "@/components/resume-mockup"

export function LandingHero() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.98,
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  // Don't render animations until client-side hydration is complete
  if (!mounted) {
    return (
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Create Professional Resumes in Minutes</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Free, privacy-focused resume builder with no signup required
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400/10 to-cyan-400/10 rounded-full blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full blur-xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-purple-400/5 to-cyan-400/5 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="container mx-auto text-center px-4 relative z-10">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500"
            variants={itemVariants}
          >
            Create Professional Resumes in Minutes
          </motion.h1>

          <motion.p className="text-xl text-muted-foreground mb-8" variants={itemVariants}>
            Free, privacy-focused resume builder with no signup required. Download as PDF and land your dream job.
          </motion.p>

          <motion.div className="flex flex-wrap justify-center gap-4 mb-12" variants={itemVariants}>
            <Link href="/builder">
              <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants} className="inline-block">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-0 rounded-lg"
                >
                  Create Your Resume <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8" variants={itemVariants}>
            <motion.div
              className="flex flex-col items-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              whileHover={{
                scale: 1.05,
                backgroundColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(124,58,237,0.05)",
                transition: { duration: 0.3 },
              }}
              variants={floatingVariants}
              animate="animate"
            >
              <div className={`p-4 rounded-full mb-4 ${theme === "dark" ? "bg-purple-900/30" : "bg-purple-100"}`}>
                <Zap className={`h-6 w-6 ${theme === "dark" ? "text-purple-300" : "text-purple-600"}`} />
              </div>
              <h3 className="font-medium mb-2">Fast & Easy</h3>
              <p className="text-sm text-muted-foreground text-center">
                Create a professional resume in just minutes with our intuitive builder
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              whileHover={{
                scale: 1.05,
                backgroundColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(124,58,237,0.05)",
                transition: { duration: 0.3 },
              }}
              variants={floatingVariants}
              animate="animate"
              style={{ animationDelay: "1s" }}
            >
              <div className={`p-4 rounded-full mb-4 ${theme === "dark" ? "bg-purple-900/30" : "bg-purple-100"}`}>
                <Shield className={`h-6 w-6 ${theme === "dark" ? "text-purple-300" : "text-purple-600"}`} />
              </div>
              <h3 className="font-medium mb-2">100% Private</h3>
              <p className="text-sm text-muted-foreground text-center">
                Your data never leaves your device - we don't store any personal information
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              whileHover={{
                scale: 1.05,
                backgroundColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(124,58,237,0.05)",
                transition: { duration: 0.3 },
              }}
              variants={floatingVariants}
              animate="animate"
              style={{ animationDelay: "2s" }}
            >
              <div className={`p-4 rounded-full mb-4 ${theme === "dark" ? "bg-purple-900/30" : "bg-purple-100"}`}>
                <FileText className={`h-6 w-6 ${theme === "dark" ? "text-purple-300" : "text-purple-600"}`} />
              </div>
              <h3 className="font-medium mb-2">PDF Export</h3>
              <p className="text-sm text-muted-foreground text-center">
                Download your resume as a professional PDF ready for job applications
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced animated resume mockup */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        >
          <ResumeMockup />

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, duration: 0.6, ease: "easeOut" }}
          >
            <Link href="/builder">
              <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants} className="inline-block">
                <Button
                  size="lg"
                  variant="secondary"
                  className="font-medium shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-0 rounded-lg"
                >
                  Start Building Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
