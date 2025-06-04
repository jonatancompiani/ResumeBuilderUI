"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { ClipboardList, Palette, Download, ArrowRight, CheckCircle, Sparkles, Zap } from "lucide-react"

export function HowItWorks() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    setMounted(true)

    // Auto-advance through steps for demonstration
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const steps = [
    {
      icon: <ClipboardList className="h-8 w-8" />,
      title: "Fill in your details",
      description: "Enter your personal information, work experience, education, skills, and languages",
      details: [
        "Personal information & contact details",
        "Professional work experience",
        "Educational background",
        "Skills and competencies",
        "Language proficiencies",
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      darkBgColor: "from-blue-950/20 to-cyan-950/20",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Choose your style",
      description: "Select a color theme that matches your personality and industry",
      details: [
        "Professional color themes",
        "Industry-appropriate designs",
        "Modern, clean layouts",
        "ATS-friendly formatting",
        "Customizable appearance",
      ],
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      darkBgColor: "from-purple-950/20 to-pink-950/20",
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: "Download PDF",
      description: "Get your resume as a professional PDF, ready to send to employers",
      details: [
        "High-quality PDF output",
        "Print-ready formatting",
        "Instant download",
        "Multiple format options",
        "Ready for job applications",
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      darkBgColor: "from-green-950/20 to-emerald-950/20",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const stepVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
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
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const numberVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.6,
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const progressVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 2,
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
    <section className="py-20 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-blue-400/10 to-cyan-400/10 blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 rounded-lg bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-xl rotate-45"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [45, 135, 45],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-20 h-20 rounded-full bg-gradient-to-r from-green-400/10 to-emerald-400/10 blur-xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        {/* Floating sparkles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 8}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + i * 0.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          >
            <Sparkles className="h-3 w-3 text-purple-400/40" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-cyan-100 dark:from-purple-900/30 dark:to-cyan-900/30 mb-6">
            <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Simple Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-cyan-800 dark:from-gray-100 dark:via-purple-200 dark:to-cyan-200 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Create your professional resume in three simple steps. Our streamlined process makes it easy to build a
            standout resume in minutes.
          </p>
        </motion.div>

        {/* Interactive step selector */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex gap-2 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeStep === index
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500 scale-125"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                aria-label={`Step ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Steps grid with enhanced design */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative px-8 py-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Connecting lines for desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full origin-left"
              variants={progressVariants}
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              className="relative z-10"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`relative overflow-visible rounded-2xl border transition-all duration-500 ${
                  activeStep === index
                    ? "border-purple-300 dark:border-purple-600 shadow-2xl scale-105"
                    : "border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl"
                } ${
                  theme === "dark"
                    ? activeStep === index
                      ? step.darkBgColor
                      : "bg-gray-800/50"
                    : activeStep === index
                      ? step.bgColor
                      : "bg-white"
                } backdrop-blur-sm`}
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 transition-opacity duration-500 ${
                    activeStep === index ? "opacity-5" : "hover:opacity-5"
                  }`}
                />

                <div className="relative p-8">
                  {/* Enhanced Step number badge with animation */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center text-white font-bold text-2xl shadow-xl border-4 border-white dark:border-gray-800 transform -rotate-3 z-20"
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    variants={{
                      initial: { scale: 0.8, opacity: 0 },
                      animate: {
                        scale: 1,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                          delay: 0.6 + index * 0.2,
                        },
                      },
                      hover: {
                        scale: 1.1,
                        transition: {
                          duration: 0.3,
                          ease: "easeInOut",
                        },
                      },
                    }}
                  >
                    <span className="transform rotate-3">{index + 1}</span>

                    {/* Pulsing ring for additional emphasis */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/50"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 0, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      }}
                    />
                  </motion.div>

                  {/* Icon with enhanced animation */}
                  <motion.div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${step.color} text-white shadow-lg`}
                    whileHover="hover"
                    variants={iconVariants}
                  >
                    {/* Pulsing ring effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-white/30"
                      animate={{
                        scale: activeStep === index ? [1, 1.2, 1] : 1,
                        opacity: activeStep === index ? [0.5, 0, 0.5] : 0.5,
                      }}
                      transition={{
                        duration: 2,
                        repeat: activeStep === index ? Number.POSITIVE_INFINITY : 0,
                        ease: "easeInOut",
                      }}
                    />
                    {step.icon}
                  </motion.div>

                  {/* Content */}
                  <motion.h3
                    className="text-2xl font-bold mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {step.title}
                  </motion.h3>

                  <motion.p
                    className="text-muted-foreground mb-6 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {step.description}
                  </motion.p>

                  {/* Feature list */}
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {step.details.map((detail, detailIndex) => (
                      <motion.div
                        key={detailIndex}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 + detailIndex * 0.1 }}
                      >
                        <CheckCircle className={`h-4 w-4 text-green-500 flex-shrink-0`} />
                        <span className="text-sm text-muted-foreground">{detail}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-20"
                      animate={{
                        x: [0, 10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center border border-gray-200 dark:border-gray-700">
                        <ArrowRight className="h-4 w-4 text-purple-500" />
                      </div>
                    </motion.div>
                  )}

                  {/* Mobile step indicator */}
                  <div className="lg:hidden flex justify-center mb-4 mt-2">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-lg shadow-md">
                      {index + 1}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <span>Ready to get started?</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
