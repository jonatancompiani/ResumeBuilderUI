"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export function ResumeMockup() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const elementVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const photoVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Enhanced background glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-xl ${
          theme === "dark"
            ? "bg-gradient-to-r from-purple-600/30 to-cyan-500/30 blur-2xl"
            : "bg-gradient-to-r from-purple-600/20 to-cyan-500/20 blur-2xl"
        }`}
        style={{ transform: "scale(0.95) translateY(20px)" }}
        animate={{
          scale: [0.95, 1.05, 0.95],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full opacity-20"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Mockup frame */}
      <motion.div
        className={`relative rounded-xl overflow-hidden border ${
          theme === "dark" ? "border-gray-800" : "border-gray-200"
        } shadow-2xl backdrop-blur-sm`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Mockup header */}
        <motion.div
          className={`h-8 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} flex items-center px-4`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex space-x-2">
            {["red", "yellow", "green"].map((color, i) => (
              <motion.div
                key={color}
                className={`w-3 h-3 rounded-full bg-${color}-500`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.2 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Resume content */}
        <div className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} p-4`}>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left column */}
            <div className="w-full md:w-1/3">
              <motion.div
                className={`w-32 h-32 rounded-full mx-auto mb-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
                variants={photoVariants}
              />

              <motion.div
                className={`h-6 w-24 mx-auto mb-6 rounded ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
                variants={elementVariants}
              />

              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className={`h-4 rounded ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
                    variants={elementVariants}
                    style={{ width: `${70 + i * 5}%` }}
                  />
                ))}
              </div>

              <motion.div
                className={`h-5 mt-6 mb-2 rounded ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
                variants={elementVariants}
                style={{ width: "80%" }}
              />

              <div className="space-y-2 mt-4">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className={`h-3 rounded ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
                    variants={elementVariants}
                    style={{ width: `${70 + i * 10}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="w-full md:w-2/3">
              <motion.div
                className={`h-8 mb-6 rounded ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
                variants={elementVariants}
                style={{ width: "70%" }}
              />

              <motion.div
                className={`h-4 mb-8 rounded ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
                variants={elementVariants}
                style={{ width: "100%" }}
              />

              {/* Experience section */}
              <motion.div
                className={`h-6 mb-4 rounded ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
                variants={elementVariants}
                style={{ width: "40%" }}
              />

              {[1, 2].map((section) => (
                <motion.div key={section} className="mb-6">
                  <motion.div
                    className={`h-5 mb-2 rounded ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
                    variants={elementVariants}
                    style={{ width: "60%" }}
                  />

                  <motion.div
                    className={`h-4 mb-2 rounded ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
                    variants={elementVariants}
                    style={{ width: "40%" }}
                  />

                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className={`h-3 rounded ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
                        variants={elementVariants}
                        style={{ width: `${85 - i * 5}%` }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Education section */}
              <motion.div
                className={`h-6 mb-4 rounded ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
                variants={elementVariants}
                style={{ width: "30%" }}
              />

              <div className="mb-6">
                <motion.div
                  className={`h-5 mb-2 rounded ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
                  variants={elementVariants}
                  style={{ width: "50%" }}
                />

                <motion.div
                  className={`h-4 mb-2 rounded ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
                  variants={elementVariants}
                  style={{ width: "35%" }}
                />

                <motion.div
                  className={`h-3 rounded ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
                  variants={elementVariants}
                  style={{ width: "70%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
