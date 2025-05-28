"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { ClipboardList, Palette, Download, ArrowRight } from "lucide-react"

export function HowItWorks() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const steps = [
    {
      icon: <ClipboardList className="h-8 w-8" />,
      title: "Fill in your details",
      description: "Enter your personal information, work experience, education, skills, and languages",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Choose your style",
      description: "Select a color theme that matches your personality and industry",
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: "Download PDF",
      description: "Get your resume as a professional PDF, ready to send to employers",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const stepVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 10,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.5,
        delay: 1,
        ease: "easeInOut",
      },
    },
  }

  if (!mounted) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-purple-400/8 to-cyan-400/8 rounded-full blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-cyan-400/8 to-purple-400/8 rounded-full blur-xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
            Create your professional resume in three simple steps
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Enhanced connecting line */}
          <motion.div
            className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 z-0 origin-left"
            variants={lineVariants}
            style={{ transformOrigin: "left center" }}
          />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              className="flex flex-col items-center text-center z-10 relative"
              whileHover={{ y: -5 }}
            >
              <motion.div
                className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 relative ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-purple-600 to-cyan-600"
                    : "bg-gradient-to-br from-purple-500 to-cyan-500"
                } text-white shadow-lg`}
                whileHover="hover"
                variants={iconVariants}
              >
                {/* Pulsing ring effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                />
                {step.icon}

                {/* Step number */}
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-white text-purple-600 rounded-full flex items-center justify-center text-sm font-bold shadow-md"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.3, duration: 0.3 }}
                >
                  {index + 1}
                </motion.div>
              </motion.div>

              <motion.h3
                className="text-xl font-semibold mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.3 }}
              >
                {step.title}
              </motion.h3>

              <motion.p
                className="text-muted-foreground max-w-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 + index * 0.3 }}
              >
                {step.description}
              </motion.p>

              {index < steps.length - 1 && (
                <motion.div
                  className="md:hidden mt-6 mb-6"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.3 }}
                >
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
