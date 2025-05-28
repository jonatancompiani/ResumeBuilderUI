"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, GraduationCap, Calendar, BookOpen } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface EducationCardProps {
  education: {
    institution: string
    degree: string
    fieldOfStudy: string
    startDate: string
    endDate: string
  }
  index: number
  onEdit: (index: number) => void
  onDelete: (index: number) => void
}

export function EducationCard({ education, index, onEdit, onDelete }: EducationCardProps) {
  const { theme } = useTheme()

  const isCurrentStudy = education.endDate.toLowerCase() === "present" || education.endDate.toLowerCase() === "current"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      layout
    >
      <Card
        className={`relative overflow-hidden transition-all duration-200 border ${
          theme === "dark"
            ? "bg-gray-800/80 hover:bg-gray-800/90 border-gray-700/60 hover:border-gray-600/80 shadow-lg hover:shadow-xl"
            : "bg-white hover:bg-gray-50/80 border-gray-200/80 hover:border-gray-300/80 shadow-sm hover:shadow-md"
        } backdrop-blur-sm`}
      >
        {/* Enhanced gradient accent bar with cyan-to-purple for education */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-90" />

        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <GraduationCap
                    className={`h-4 w-4 flex-shrink-0 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                  />
                  <h3
                    className={`text-lg font-semibold truncate ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}
                  >
                    {education.institution}
                  </h3>
                </div>
                {isCurrentStudy && (
                  <Badge
                    variant="secondary"
                    className={`flex-shrink-0 text-xs font-medium ${
                      theme === "dark"
                        ? "bg-blue-900/40 text-blue-300 border-blue-700/50 hover:bg-blue-900/60"
                        : "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200"
                    }`}
                  >
                    Current
                  </Badge>
                )}
              </div>

              <p className={`text-base font-medium mb-3 ${theme === "dark" ? "text-cyan-300" : "text-cyan-600"}`}>
                {education.degree}
              </p>

              {education.fieldOfStudy && (
                <div
                  className={`flex items-center gap-2 text-sm mb-3 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="truncate">{education.fieldOfStudy}</span>
                </div>
              )}

              <div
                className={`flex items-center gap-2 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
              >
                <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">
                  {education.startDate} - {education.endDate}
                </span>
              </div>
            </div>

            <div className="flex sm:flex-col gap-2 sm:ml-4 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(index)}
                className={`h-8 w-8 p-0 transition-colors ${
                  theme === "dark"
                    ? "hover:bg-blue-900/30 hover:text-blue-300 text-blue-400"
                    : "hover:bg-blue-100 hover:text-blue-700 text-blue-600"
                }`}
              >
                <Pencil className="h-3.5 w-3.5" />
                <span className="sr-only">Edit education</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(index)}
                className={`h-8 w-8 p-0 transition-colors ${
                  theme === "dark"
                    ? "hover:bg-red-900/30 hover:text-red-300 text-red-400"
                    : "hover:bg-red-100 hover:text-red-700 text-red-600"
                }`}
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span className="sr-only">Delete education</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
