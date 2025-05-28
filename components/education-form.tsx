"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Save, X, Plus } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface EducationFormProps {
  form: any
  index: number
  isEditing: boolean
  onSave: () => void
  onCancel: () => void
  showForm: boolean
}

export function EducationForm({ form, index, isEditing, onSave, onCancel, showForm }: EducationFormProps) {
  const { theme } = useTheme()

  if (!showForm) return null

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`border-2 border-dashed transition-all duration-200 ${
          theme === "dark"
            ? "border-gray-600/60 bg-gray-800/40 hover:border-gray-500/80 hover:bg-gray-800/60"
            : "border-gray-300/80 bg-gray-50/60 hover:border-gray-400/80 hover:bg-gray-50/80"
        } backdrop-blur-sm`}
      >
        <CardHeader className="pb-4">
          <CardTitle
            className={`flex items-center gap-2 text-lg ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}
          >
            {isEditing ? (
              <>
                <Save className={`h-5 w-5 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
                Edit Education
              </>
            ) : (
              <>
                <Plus className={`h-5 w-5 ${theme === "dark" ? "text-green-400" : "text-green-600"}`} />
                Add Education
              </>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`education.${index}.institution`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={theme === "dark" ? "text-gray-200" : "text-gray-700"}>Institution *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="University/School name"
                      {...field}
                      className={`transition-colors ${
                        theme === "dark"
                          ? "bg-gray-900/50 border-gray-700/60 text-gray-100 placeholder:text-gray-500 focus:border-cyan-500/60 focus:ring-cyan-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`education.${index}.degree`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={theme === "dark" ? "text-gray-200" : "text-gray-700"}>Degree *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Bachelor's, Master's, etc."
                      {...field}
                      className={`transition-colors ${
                        theme === "dark"
                          ? "bg-gray-900/50 border-gray-700/60 text-gray-100 placeholder:text-gray-500 focus:border-cyan-500/60 focus:ring-cyan-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`education.${index}.fieldOfStudy`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={theme === "dark" ? "text-gray-200" : "text-gray-700"}>Field of Study</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Computer Science, Business, etc."
                      {...field}
                      className={`transition-colors ${
                        theme === "dark"
                          ? "bg-gray-900/50 border-gray-700/60 text-gray-100 placeholder:text-gray-500 focus:border-cyan-500/60 focus:ring-cyan-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`education.${index}.startDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={theme === "dark" ? "text-gray-200" : "text-gray-700"}>Start Date *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="MM/YYYY"
                        {...field}
                        className={`transition-colors ${
                          theme === "dark"
                            ? "bg-gray-900/50 border-gray-700/60 text-gray-100 placeholder:text-gray-500 focus:border-cyan-500/60 focus:ring-cyan-500/20"
                            : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`education.${index}.endDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={theme === "dark" ? "text-gray-200" : "text-gray-700"}>End Date *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="MM/YYYY or Present"
                        {...field}
                        className={`transition-colors ${
                          theme === "dark"
                            ? "bg-gray-900/50 border-gray-700/60 text-gray-100 placeholder:text-gray-500 focus:border-cyan-500/60 focus:ring-cyan-500/20"
                            : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className={`transition-colors ${
                theme === "dark"
                  ? "border-gray-600/60 text-gray-300 hover:bg-gray-700/50 hover:text-gray-200 hover:border-gray-500/80"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400"
              }`}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="button"
              onClick={onSave}
              className={`transition-colors ${
                theme === "dark"
                  ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                  : "bg-cyan-600 hover:bg-cyan-700 text-white"
              }`}
            >
              <Save className="h-4 w-4 mr-2" />
              {isEditing ? "Update" : "Save"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
