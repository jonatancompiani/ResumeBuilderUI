"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, Plus, Trash2, Download, AlertCircle, RefreshCw } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { LinkedInImportButton } from "@/components/linkedin-import-button"
import { ExperienceCard } from "@/components/experience-card"
import { EducationCard } from "@/components/education-card"
import { ExperienceForm } from "@/components/experience-form"
import { EducationForm } from "@/components/education-form"
import { AnimatePresence } from "framer-motion"
import { LanguageCard } from "@/components/language-card"
import { LanguageForm } from "@/components/language-form"

// Form schema with more flexible validation
const formSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(5, { message: "Please enter a valid phone number." }),
    location: z.string().min(2, { message: "Please enter your location." }),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    summary: z.string().optional(),
  }),
  workExperiences: z
    .array(
      z.object({
        company: z.string().min(1, { message: "Company name is required." }),
        position: z.string().min(1, { message: "Position is required." }),
        startDate: z.string().min(1, { message: "Start date is required." }),
        endDate: z.string().min(1, { message: "End date is required." }),
        description: z.string().optional(),
      }),
    )
    .min(1, { message: "Add at least one work experience." }),
  education: z
    .array(
      z.object({
        institution: z.string().min(1, { message: "Institution name is required." }),
        degree: z.string().min(1, { message: "Degree is required." }),
        fieldOfStudy: z.string().optional(),
        startDate: z.string().min(1, { message: "Start date is required." }),
        endDate: z.string().min(1, { message: "End date is required." }),
      }),
    )
    .min(1, { message: "Add at least one education entry." }),
  skills: z.array(z.string()).min(1, { message: "Add at least one skill." }),
  languages: z
    .array(
      z.object({
        language: z.string().min(1, { message: "Language name is required." }),
        proficiency: z.string().min(1, { message: "Proficiency level is required." }),
      }),
    )
    .min(1, { message: "Add at least one language." }),
})

type FormValues = z.infer<typeof formSchema>

interface ColorSwatchProps {
  color: string
  isSelected: boolean
  onClick: () => void
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 rounded-full cursor-pointer transition-all duration-200 ${isSelected ? "ring-2 ring-primary ring-offset-1" : "hover:scale-110"}`}
      style={{ backgroundColor: color }}
      aria-label={`Select color ${color}`}
    />
  )
}

export default function ResumeBuilder() {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState("personal")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false)
  const [resumeImage, setResumeImage] = useState<string | null>(null)
  const [newSkill, setNewSkill] = useState("")
  const [avatarImage, setAvatarImage] = useState<string>()
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [tabErrors, setTabErrors] = useState({
    personal: false,
    experience: false,
    education: false,
    skills: false,
    languages: false,
  })
  const [availableColors, setAvailableColors] = useState<string[]>([])
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [isLoadingColors, setIsLoadingColors] = useState(false)
  const [colorError, setColorError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormValues | null>(null)
  const [showExperienceForm, setShowExperienceForm] = useState(false)
  const [showEducationForm, setShowEducationForm] = useState(false)
  const [editingExperienceIndex, setEditingExperienceIndex] = useState<number | null>(null)
  const [editingEducationIndex, setEditingEducationIndex] = useState<number | null>(null)
  const [showLanguageForm, setShowLanguageForm] = useState(false)
  const [editingLanguageIndex, setEditingLanguageIndex] = useState<number | null>(null)

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        summary: "",
      },
      workExperiences: [],
      education: [],
      skills: [],
      languages: [],
    },
    mode: "onTouched",
  })

  // Fetch available colors on component mount
  useEffect(() => {
    fetchAvailableColors()
  }, [])

  // Function to fetch available colors
  const fetchAvailableColors = async () => {
    setIsLoadingColors(true)
    setColorError(null)
    try {
      const response = await fetch("/api/get-colors")
      if (!response.ok) {
        throw new Error(`Failed to fetch colors: ${response.status}`)
      }
      const data = await response.json()
      if (data.success && Array.isArray(data.colors)) {
        setAvailableColors(data.colors)
        // If we have colors and none is selected, select the first one
        if (data.colors.length > 0 && !selectedColor) {
          setSelectedColor(data.colors[0])
        }
      } else {
        throw new Error("Invalid color data received")
      }
    } catch (error) {
      console.error("Error fetching colors:", error)
      setColorError(error.message || "Failed to load colors")
      // Fallback colors in case the API fails
      const fallbackColors = [
        "#01579b",
        "#0d47a1",
        "#1565c0",
        "#1976d2",
        "#1e88e5",
        "#2196f3",
        "#42a5f5",
        "#64b5f6",
        "#90caf9",
        "#bbdefb",
      ]
      setAvailableColors(fallbackColors)
      if (!selectedColor) {
        setSelectedColor(fallbackColors[0])
      }
    } finally {
      setIsLoadingColors(false)
    }
  }

  // Track validation errors for each tab
  useEffect(() => {
    const errors = form.formState.errors

    setTabErrors({
      personal: !!(
        errors.personalInfo?.fullName ||
        errors.personalInfo?.email ||
        errors.personalInfo?.phone ||
        errors.personalInfo?.location
      ),
      experience: !!errors.workExperiences,
      education: !!errors.education,
      skills: !!errors.skills,
      languages: !!errors.languages,
    })
  }, [form.formState.errors, form.formState.isValid])

  // Add new work experience
  const addWorkExperience = () => {
    const currentExperiences = form.getValues("workExperiences")
    form.setValue("workExperiences", [
      ...currentExperiences,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])
  }

  // Remove work experience
  const removeWorkExperience = (index: number) => {
    const currentExperiences = form.getValues("workExperiences")
    form.setValue(
      "workExperiences",
      currentExperiences.filter((_, i) => i !== index),
    )
  }

  // Add new education
  const addEducation = () => {
    const currentEducation = form.getValues("education")
    form.setValue("education", [
      ...currentEducation,
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
      },
    ])
  }

  // Remove education
  const removeEducation = (index: number) => {
    const currentEducation = form.getValues("education")
    form.setValue(
      "education",
      currentEducation.filter((_, i) => i !== index),
    )
  }

  // Add new language
  const addLanguage = () => {
    const currentLanguages = form.getValues("languages")
    form.setValue("languages", [
      ...currentLanguages,
      {
        language: "",
        proficiency: "Beginner",
      },
    ])
  }

  // Remove language
  const removeLanguage = (index: number) => {
    const currentLanguages = form.getValues("languages")
    form.setValue(
      "languages",
      currentLanguages.filter((_, i) => i !== index),
    )
  }

  // Add skill
  const addSkill = () => {
    if (newSkill.trim()) {
      const currentSkills = form.getValues("skills")
      form.setValue("skills", [...currentSkills, newSkill.trim()])
      setNewSkill("")
    }
  }

  // Remove skill
  const removeSkill = (index: number) => {
    const currentSkills = form.getValues("skills")
    form.setValue(
      "skills",
      currentSkills.filter((_, i) => i !== index),
    )
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()

      // Set up preview
      const previewReader = new FileReader()
      previewReader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      }
      previewReader.readAsDataURL(file)

      // Convert to base64
      reader.onload = (e) => {
        const base64String = (e.target?.result as string)?.split(",")[1]
        if (base64String) {
          setAvatarImage(base64String)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLinkedInData = (data) => {
    // Update form with LinkedIn data
    form.setValue("personalInfo.fullName", data.fullName || "")
    form.setValue("personalInfo.email", data.email || "")
    form.setValue("personalInfo.linkedin", data.linkedinUrl || "")

    // Set profile picture if available
    if (data.profilePicture) {
      setAvatarPreview(data.profilePicture)
      // Convert image URL to base64 if needed for the API
      fetch(data.profilePicture)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            const base64String = (e.target?.result as string)?.split(",")[1]
            if (base64String) {
              setAvatarImage(base64String)
            }
          }
          reader.readAsDataURL(blob)
        })
        .catch((error) => console.error("Error fetching profile picture:", error))
    }

    // Set work experiences if available
    if (data.positions && data.positions.length > 0) {
      const workExperiences = data.positions.map((position) => ({
        company: position.companyName || "",
        position: position.title || "",
        startDate: position.startDate ? `${position.startDate.month}/${position.startDate.year}` : "",
        endDate: position.endDate ? `${position.endDate.month}/${position.endDate.year}` : "Present",
        description: position.description || "",
      }))
      form.setValue("workExperiences", workExperiences)
    }

    // Set education if available
    if (data.education && data.education.length > 0) {
      const educationItems = data.education.map((edu) => ({
        institution: edu.schoolName || "",
        degree: edu.degree || "",
        fieldOfStudy: edu.fieldOfStudy || "",
        startDate: edu.startDate ? `${edu.startDate.month}/${edu.startDate.year}` : "",
        endDate: edu.endDate ? `${edu.endDate.month}/${edu.endDate.year}` : "Present",
      }))
      form.setValue("education", educationItems)
    }

    // Set skills if available
    if (data.skills && data.skills.length > 0) {
      form.setValue("skills", data.skills)
    }
  }

  // Create API request data from form values
  const createApiRequestData = (data: FormValues) => {
    return {
      Name: data.personalInfo.fullName,
      Base64avatar: avatarImage,
      ThemeColor: selectedColor,
      Profession: data.workExperiences[0]?.position || "",
      Address: data.personalInfo.location,
      Phone: data.personalInfo.phone,
      Email: data.personalInfo.email,
      Linkedin: data.personalInfo.linkedin || "",
      Github: data.personalInfo.github || "",
      Summary: data.personalInfo.summary,
      SkillList: data.skills,
      LanguageList: data.languages.map((lang) => ({
        Name: lang.language,
        Level: lang.proficiency,
      })),
      WorkExperienceList: data.workExperiences.map((exp) => ({
        Company: exp.company,
        Role: exp.position,
        StartDate: exp.startDate,
        EndDate: exp.endDate === "Present" ? null : exp.endDate,
        Description: exp.description,
      })),
      EducationList: data.education.map((edu) => ({
        Year: `${edu.startDate}-${edu.endDate === "Present" ? "Current" : edu.endDate}`,
        Institution: edu.institution,
        Title: `${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}`,
        Description: "",
      })),
    }
  }

  // Custom validation function to filter out empty entries
  const validateAndCleanData = (data: FormValues): FormValues => {
    // Filter out empty work experiences
    const validWorkExperiences = data.workExperiences.filter(
      (exp) => exp.company.trim() && exp.position.trim() && exp.startDate.trim() && exp.endDate.trim(),
    )

    // Filter out empty education entries
    const validEducation = data.education.filter(
      (edu) => edu.institution.trim() && edu.degree.trim() && edu.startDate.trim() && edu.endDate.trim(),
    )

    // Filter out empty languages
    const validLanguages = data.languages.filter((lang) => lang.language.trim() && lang.proficiency.trim())

    return {
      ...data,
      workExperiences: validWorkExperiences,
      education: validEducation,
      languages: validLanguages,
    }
  }

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    if (!selectedColor) {
      alert("Please select a theme color before generating your resume")
      return
    }

    // Clean and validate data
    const cleanedData = validateAndCleanData(data)

    // Check if we have at least one valid entry for required arrays
    if (cleanedData.workExperiences.length === 0) {
      alert("Please add at least one complete work experience entry.")
      setActiveTab("experience")
      return
    }

    if (cleanedData.education.length === 0) {
      alert("Please add at least one complete education entry.")
      setActiveTab("education")
      return
    }

    if (cleanedData.skills.length === 0) {
      alert("Please add at least one skill.")
      setActiveTab("skills")
      return
    }

    if (cleanedData.languages.length === 0) {
      alert("Please add at least one language.")
      setActiveTab("languages")
      return
    }

    setFormData(cleanedData)
    setIsSubmitting(true)
    try {
      const apiRequestData = createApiRequestData(cleanedData)

      // Call our own API route
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `API responded with status: ${response.status}`)
      }

      // Get the response data which contains the base64 image
      const responseData = await response.json()

      if (responseData.success && responseData.imageData) {
        // Create a data URL from the base64 string
        const imageUrl = `data:image/png;base64,${responseData.imageData}`
        setResumeImage(imageUrl)
        setActiveTab("preview")
      } else {
        throw new Error("Failed to get resume image data")
      }
    } catch (error) {
      console.error("Error submitting resume:", error)
      alert(`Failed to generate resume: ${error.message || "Unknown error"}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle PDF download
  const handleDownloadPdf = async () => {
    if (!formData) return

    setIsDownloadingPdf(true)
    try {
      const apiRequestData = createApiRequestData(formData)

      // Call our PDF download API route
      const response = await fetch("/api/download-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `API responded with status: ${response.status}`)
      }

      // Check the content type to determine how to handle the response
      const contentType = response.headers.get("Content-Type")

      if (contentType && contentType.includes("application/json")) {
        // Handle JSON response with base64 string
        const data = await response.json()

        if (!data.pdfData) {
          throw new Error("No PDF data received from the server")
        }

        // Convert base64 to blob
        const byteCharacters = atob(data.pdfData)
        const byteArrays = []

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512)

          const byteNumbers = new Array(slice.length)
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i)
          }

          const byteArray = new Uint8Array(byteNumbers)
          byteArrays.push(byteArray)
        }

        const pdfBlob = new Blob(byteArrays, { type: "application/pdf" })

        // Create download link
        const url = window.URL.createObjectURL(pdfBlob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${formData.personalInfo.fullName.replace(/\s+/g, "_")}_resume.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } else {
        // Handle binary response (blob)
        const pdfBlob = await response.blob()

        // Create download link
        const url = window.URL.createObjectURL(pdfBlob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${formData.personalInfo.fullName.replace(/\s+/g, "_")}_resume.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("Error downloading PDF:", error)
      alert(`Failed to download PDF: ${error.message || "Unknown error"}`)
    } finally {
      setIsDownloadingPdf(false)
    }
  }

  // Navigate to the first tab with errors
  const navigateToFirstErrorTab = () => {
    if (tabErrors.personal) {
      setActiveTab("personal")
    } else if (tabErrors.experience) {
      setActiveTab("experience")
    } else if (tabErrors.education) {
      setActiveTab("education")
    } else if (tabErrors.skills) {
      setActiveTab("skills")
    } else if (tabErrors.languages) {
      setActiveTab("languages")
    }
  }

  return (
    <section aria-label="Resume Builder Tool" className="max-w-4xl mx-auto">
      <h2 className="sr-only">Resume Builder Form</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 sm:grid-cols-6 mb-6 sm:mb-8 overflow-x-auto">
          <TabsTrigger value="personal" className="relative text-xs sm:text-sm">
            Personal
            {tabErrors.personal && (
              <span
                className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-red-500 dark:bg-red-400"
                aria-hidden="true"
              />
            )}
          </TabsTrigger>
          <TabsTrigger value="experience" className="relative text-xs sm:text-sm">
            Experience
            {tabErrors.experience && (
              <span
                className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-red-500 dark:bg-red-400"
                aria-hidden="true"
              />
            )}
          </TabsTrigger>
          <TabsTrigger value="education" className="relative text-xs sm:text-sm">
            Education
            {tabErrors.education && (
              <span
                className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-red-500 dark:bg-red-400"
                aria-hidden="true"
              />
            )}
          </TabsTrigger>
          <TabsTrigger value="skills" className="relative text-xs sm:text-sm">
            Skills
            {tabErrors.skills && (
              <span
                className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-red-500 dark:bg-red-400"
                aria-hidden="true"
              />
            )}
          </TabsTrigger>
          <TabsTrigger value="languages" className="relative text-xs sm:text-sm">
            Languages
            {tabErrors.languages && (
              <span
                className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-red-500 dark:bg-red-400"
                aria-hidden="true"
              />
            )}
          </TabsTrigger>
          <TabsTrigger value="preview" className="relative text-xs sm:text-sm">
            Preview
          </TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.error("Form validation errors:", errors)
              navigateToFirstErrorTab()
            })}
          >
            {/* Personal Information */}
            <TabsContent value="personal">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 md:col-span-2 mb-6">
                      <Label htmlFor="profile-picture">Profile Picture</Label>
                      <div className="flex flex-col sm:flex-row gap-4 items-start mt-1">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border flex-shrink-0 dark:border-gray-700">
                          <img
                            src={avatarPreview || "/placeholder.svg?height=96&width=96"}
                            alt="Profile preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <Input
                            id="profile-picture"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="cursor-pointer text-xs sm:text-sm"
                          />
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            Upload a profile picture for your resume
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 mb-6">
                      <LinkedInImportButton onDataReceived={handleLinkedInData} className="w-full sm:w-auto" />
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Import your profile information directly from LinkedIn using OpenID Connect
                      </p>
                    </div>
                    <FormField
                      control={form.control}
                      name="personalInfo.fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john.doe@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="New York, NY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.github"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub</FormLabel>
                          <FormControl>
                            <Input placeholder="https://github.com/username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalInfo.summary"
                      render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-2">
                          <FormLabel>Professional Summary</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Briefly describe your professional background and goals"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end mt-6 col-span-1 md:col-span-2">
                    <Button type="button" onClick={() => setActiveTab("experience")}>
                      Next: Work Experience
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Work Experience */}
            <TabsContent value="experience">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Work Experience</h3>
                    <Button
                      type="button"
                      onClick={() => {
                        setShowExperienceForm(true)
                        setEditingExperienceIndex(null)
                        addWorkExperience()
                      }}
                      className={`transition-colors ${
                        theme === "dark"
                          ? "bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Experience
                    </Button>
                  </div>

                  {/* Display existing experiences as cards */}
                  <div className="space-y-4 mb-6">
                    <AnimatePresence>
                      {form.watch("workExperiences").map((experience, index) => {
                        // Don't show card for the item being edited or if it's empty
                        if (editingExperienceIndex === index || (!experience.company && !experience.position)) {
                          return null
                        }

                        return (
                          <ExperienceCard
                            key={index}
                            experience={experience}
                            index={index}
                            onEdit={(idx) => {
                              setEditingExperienceIndex(idx)
                              setShowExperienceForm(true)
                            }}
                            onDelete={removeWorkExperience}
                          />
                        )
                      })}
                    </AnimatePresence>
                  </div>

                  {/* Show message if no experiences */}
                  {form.watch("workExperiences").length === 0 && !showExperienceForm && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No work experiences added yet. Click "Add Experience" to get started.</p>
                    </div>
                  )}

                  {/* Experience form */}
                  <ExperienceForm
                    form={form}
                    index={editingExperienceIndex ?? form.watch("workExperiences").length - 1}
                    isEditing={editingExperienceIndex !== null}
                    showForm={showExperienceForm}
                    onSave={() => {
                      setShowExperienceForm(false)
                      setEditingExperienceIndex(null)
                    }}
                    onCancel={() => {
                      setShowExperienceForm(false)
                      if (editingExperienceIndex === null) {
                        // Remove the empty entry that was added
                        const currentExperiences = form.getValues("workExperiences")
                        if (currentExperiences.length > 0) {
                          const lastExperience = currentExperiences[currentExperiences.length - 1]
                          if (!lastExperience.company && !lastExperience.position) {
                            removeWorkExperience(currentExperiences.length - 1)
                          }
                        }
                      }
                      setEditingExperienceIndex(null)
                    }}
                  />

                  <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("personal")}>
                      Previous: Personal Info
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("education")}>
                      Next: Education
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Education */}
            <TabsContent value="education">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Education</h3>
                    <Button
                      type="button"
                      onClick={() => {
                        setShowEducationForm(true)
                        setEditingEducationIndex(null)
                        addEducation()
                      }}
                      className={`transition-colors ${
                        theme === "dark"
                          ? "bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </div>

                  {/* Display existing education as cards */}
                  <div className="space-y-4 mb-6">
                    <AnimatePresence>
                      {form.watch("education").map((education, index) => {
                        // Don't show card for the item being edited or if it's empty
                        if (editingEducationIndex === index || (!education.institution && !education.degree)) {
                          return null
                        }

                        return (
                          <EducationCard
                            key={index}
                            education={education}
                            index={index}
                            onEdit={(idx) => {
                              setEditingEducationIndex(idx)
                              setShowEducationForm(true)
                            }}
                            onDelete={removeEducation}
                          />
                        )
                      })}
                    </AnimatePresence>
                  </div>

                  {/* Show message if no education */}
                  {form.watch("education").length === 0 && !showEducationForm && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No education entries added yet. Click "Add Education" to get started.</p>
                    </div>
                  )}

                  {/* Education form */}
                  <EducationForm
                    form={form}
                    index={editingEducationIndex ?? form.watch("education").length - 1}
                    isEditing={editingEducationIndex !== null}
                    showForm={showEducationForm}
                    onSave={() => {
                      setShowEducationForm(false)
                      setEditingEducationIndex(null)
                    }}
                    onCancel={() => {
                      setShowEducationForm(false)
                      if (editingEducationIndex === null) {
                        // Remove the empty entry that was added
                        const currentEducation = form.getValues("education")
                        if (currentEducation.length > 0) {
                          const lastEducation = currentEducation[currentEducation.length - 1]
                          if (!lastEducation.institution && !lastEducation.degree) {
                            removeEducation(currentEducation.length - 1)
                          }
                        }
                      }
                      setEditingEducationIndex(null)
                    }}
                  />

                  <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("experience")}>
                      Previous: Work Experience
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("skills")}>
                      Next: Skills
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skills */}
            <TabsContent value="skills">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <div className="flex flex-col gap-2">
                      <div className="font-medium">Skills</div>
                      <div className="flex">
                        <Input
                          placeholder="Add a skill"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          className="mr-2"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addSkill()
                            }
                          }}
                        />
                        <Button type="button" onClick={addSkill}>
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {form.watch("skills").map((skill, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 flex items-center text-sm"
                      >
                        {skill}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0 ml-1"
                          onClick={() => removeSkill(index)}
                        >
                          <Trash2 className="h-3 w-3" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    ))}
                  </div>

                  {form.watch("skills").length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No skills added yet. Add your first skill above.</p>
                    </div>
                  )}

                  <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("education")}>
                      Previous: Education
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("languages")}>
                      Next: Languages
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Languages */}
            <TabsContent value="languages">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Languages</h3>
                    <Button
                      type="button"
                      onClick={() => {
                        setShowLanguageForm(true)
                        setEditingLanguageIndex(null)
                        addLanguage()
                      }}
                      className={`transition-colors ${
                        theme === "dark"
                          ? "bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Language
                    </Button>
                  </div>

                  {/* Display existing languages as cards */}
                  <div className="space-y-4 mb-6">
                    <AnimatePresence>
                      {form.watch("languages").map((language, index) => {
                        // Don't show card for the item being edited or if it's empty
                        if (editingLanguageIndex === index || (!language.language && !language.proficiency)) {
                          return null
                        }

                        return (
                          <LanguageCard
                            key={index}
                            language={language}
                            index={index}
                            onEdit={(idx) => {
                              setEditingLanguageIndex(idx)
                              setShowLanguageForm(true)
                            }}
                            onDelete={removeLanguage}
                          />
                        )
                      })}
                    </AnimatePresence>
                  </div>

                  {/* Show message if no languages */}
                  {form.watch("languages").length === 0 && !showLanguageForm && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No languages added yet. Click "Add Language" to get started.</p>
                    </div>
                  )}

                  {/* Language form */}
                  <LanguageForm
                    form={form}
                    index={editingLanguageIndex ?? form.watch("languages").length - 1}
                    isEditing={editingLanguageIndex !== null}
                    showForm={showLanguageForm}
                    onSave={() => {
                      setShowLanguageForm(false)
                      setEditingLanguageIndex(null)
                    }}
                    onCancel={() => {
                      setShowLanguageForm(false)
                      if (editingLanguageIndex === null) {
                        // Remove the empty entry that was added
                        const currentLanguages = form.getValues("languages")
                        if (currentLanguages.length > 0) {
                          const lastLanguage = currentLanguages[currentLanguages.length - 1]
                          if (!lastLanguage.language && !lastLanguage.proficiency) {
                            removeLanguage(currentLanguages.length - 1)
                          }
                        }
                      }
                      setEditingLanguageIndex(null)
                    }}
                  />

                  <div className="flex justify-between mt-6">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("skills")}>
                      Previous: Skills
                    </Button>
                    <Button type="button" onClick={() => setActiveTab("preview")}>
                      Next: Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preview */}
            <TabsContent value="preview">
              <Card>
                <CardContent className="pt-6">
                  {/* Theme Color Selection */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">Select Theme Color</h3>
                    <div className="flex items-center mb-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={fetchAvailableColors}
                        disabled={isLoadingColors}
                        className="mr-2"
                      >
                        {isLoadingColors ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                        <span className="ml-1">Refresh Colors</span>
                      </Button>
                      {colorError && <p className="text-sm text-red-500 dark:text-red-400">{colorError}</p>}
                    </div>

                    {isLoadingColors ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-gray-400 dark:text-gray-500" />
                        <span className="ml-2 text-gray-500 dark:text-gray-400">Loading colors...</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-3">
                        {availableColors.map((color) => (
                          <ColorSwatch
                            key={color}
                            color={color}
                            isSelected={selectedColor === color}
                            onClick={() => setSelectedColor(color)}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {resumeImage ? (
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-semibold mb-4">Your Resume</h3>
                      <div className="border rounded-md overflow-hidden shadow-lg dark:border-gray-700">
                        <img
                          src={resumeImage || "/placeholder.svg"}
                          alt="Preview of your generated resume"
                          className="max-w-full h-auto"
                          style={{ maxHeight: "800px" }}
                        />
                      </div>

                      <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 justify-center">
                        <Button
                          type="button"
                          onClick={() => {
                            // For data URLs, we need to fetch and convert to blob for download
                            fetch(resumeImage)
                              .then((response) => response.blob())
                              .then((blob) => {
                                const url = window.URL.createObjectURL(blob)
                                const link = document.createElement("a")
                                link.href = url
                                link.download = `${form.getValues().personalInfo.fullName.replace(/\s+/g, "_")}_resume.png`
                                document.body.appendChild(link)
                                link.click()
                                document.body.removeChild(link)
                                window.URL.revokeObjectURL(url)
                              })
                          }}
                          className="text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 h-auto"
                        >
                          <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          Download PNG
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handleDownloadPdf}
                          disabled={isDownloadingPdf}
                          className="text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 h-auto"
                        >
                          {isDownloadingPdf ? (
                            <>
                              <Loader2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                              Downloading...
                            </>
                          ) : (
                            <>
                              <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                              Download PDF
                            </>
                          )}
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting || !selectedColor}
                          className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 h-auto"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                              Regenerating...
                            </>
                          ) : (
                            "Regenerate Resume"
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <h3 className="text-xl font-semibold mb-2">No Resume Generated Yet</h3>
                      <p className="text-muted-foreground mb-6">
                        Fill out the form and click "Generate Resume" to create your resume.
                      </p>
                      <div className="flex flex-wrap gap-4 justify-center">
                        <Button
                          type="submit"
                          disabled={isSubmitting || !selectedColor}
                          className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Generating Resume...
                            </>
                          ) : (
                            "Generate Resume"
                          )}
                        </Button>
                      </div>
                      {!selectedColor && (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-600 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400 flex items-center gap-2">
                          <AlertCircle className="h-5 w-5" />
                          <p>Please select a theme color before generating your resume.</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </section>
  )
}
