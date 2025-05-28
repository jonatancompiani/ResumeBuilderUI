"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Globe, Star } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface LanguageCardProps {
  language: {
    language: string
    proficiency: string
  }
  index: number
  onEdit: (index: number) => void
  onDelete: (index: number) => void
}

export function LanguageCard({ language, index, onEdit, onDelete }: LanguageCardProps) {
  const { theme } = useTheme()

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency.toLowerCase()) {
      case "native":
        return theme === "dark"
          ? "bg-emerald-900/40 text-emerald-300 border-emerald-700/50"
          : "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "fluent":
        return theme === "dark"
          ? "bg-blue-900/40 text-blue-300 border-blue-700/50"
          : "bg-blue-100 text-blue-800 border-blue-200"
      case "advanced":
        return theme === "dark"
          ? "bg-purple-900/40 text-purple-300 border-purple-700/50"
          : "bg-purple-100 text-purple-800 border-purple-200"
      case "intermediate":
        return theme === "dark"
          ? "bg-orange-900/40 text-orange-300 border-orange-700/50"
          : "bg-orange-100 text-orange-800 border-orange-200"
      case "beginner":
        return theme === "dark"
          ? "bg-gray-900/40 text-gray-300 border-gray-700/50"
          : "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return theme === "dark"
          ? "bg-gray-900/40 text-gray-300 border-gray-700/50"
          : "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getProficiencyStars = (proficiency: string) => {
    switch (proficiency.toLowerCase()) {
      case "native":
        return 5
      case "fluent":
        return 4
      case "advanced":
        return 3
      case "intermediate":
        return 2
      case "beginner":
        return 1
      default:
        return 1
    }
  }

  const stars = getProficiencyStars(language.proficiency)

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
        {/* Enhanced gradient accent bar with orange-to-red for languages */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 opacity-90" />

        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <Globe className={`h-4 w-4 flex-shrink-0 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                  <h3
                    className={`text-lg font-semibold truncate ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}
                  >
                    {language.language}
                  </h3>
                </div>
                <Badge
                  variant="secondary"
                  className={`flex-shrink-0 text-xs font-medium ${getProficiencyColor(language.proficiency)}`}
                >
                  {language.proficiency}
                </Badge>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Proficiency:</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < stars
                          ? "text-yellow-500 fill-yellow-500"
                          : theme === "dark"
                            ? "text-gray-600"
                            : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div
                className={`p-3 sm:p-4 rounded-lg border ${
                  theme === "dark" ? "bg-gray-900/50 border-gray-700/50" : "bg-gray-50/80 border-gray-200/50"
                }`}
              >
                <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  {language.proficiency === "Native" && "Native speaker with complete fluency"}
                  {language.proficiency === "Fluent" && "Fluent speaker with excellent command"}
                  {language.proficiency === "Advanced" && "Advanced proficiency with strong communication skills"}
                  {language.proficiency === "Intermediate" && "Intermediate level with good conversational ability"}
                  {language.proficiency === "Beginner" && "Basic understanding and limited conversational ability"}
                </p>
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
                <span className="sr-only">Edit language</span>
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
                <span className="sr-only">Delete language</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
