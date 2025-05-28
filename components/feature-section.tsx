"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Linkedin, Download, Clock, Shield, Palette, FileText, UserCheck, Smartphone } from "lucide-react"
import { useState, useEffect } from "react"

export function FeatureSection() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Quick & Easy",
      description: "Create a professional resume in just minutes with our intuitive form-based builder",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Privacy First",
      description: "Your data never leaves your device - we don't collect or store any personal information",
    },
    {
      icon: <Download className="h-5 w-5" />,
      title: "PDF Download",
      description: "Download your resume as a professional PDF, ready to send to potential employers",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      title: "LinkedIn Import",
      description: "Import your professional details directly from LinkedIn to save time",
    },
    {
      icon: <Palette className="h-5 w-5" />,
      title: "Customizable",
      description: "Choose from multiple color themes to personalize your resume",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "ATS-Friendly",
      description: "Optimized for Applicant Tracking Systems to help you pass the first screening",
    },
    {
      icon: <UserCheck className="h-5 w-5" />,
      title: "No Account Needed",
      description: "No sign-up or registration required - just create and download",
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: "Mobile Friendly",
      description: "Create your resume on any device - desktop, tablet, or smartphone",
    },
  ]

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: {
      y: 30,
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const cardHoverVariants = {
    hover: {
      y: -4,
      scale: 1.01,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  if (!mounted) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everything You Need to Create the Perfect Resume
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{/* Static placeholder */}</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-r from-purple-400/5 to-cyan-400/5 rounded-full blur-2xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400/5 to-purple-400/5 rounded-full blur-2xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Everything You Need to Create the Perfect Resume
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Our resume builder provides all the tools and features you need to create a professional, job-winning resume
            without the hassle.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-xl border transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-800/90 hover:bg-gray-750/90 border-gray-600/40 shadow-xl hover:shadow-2xl"
                  : "bg-white hover:bg-gray-50 border-gray-200/50 shadow-sm hover:shadow-md"
              } backdrop-blur-sm`}
              variants={itemVariants}
              whileHover="hover"
              custom={index}
            >
              <motion.div variants={cardHoverVariants} className="h-full">
                {/* Header with inline icon and title */}
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className={`p-2 rounded-lg flex-shrink-0 ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-purple-500/25 to-cyan-500/25 text-purple-300 border border-purple-400/30"
                        : "bg-gradient-to-br from-purple-100 to-cyan-100 text-purple-600 border border-purple-200/50"
                    }`}
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
