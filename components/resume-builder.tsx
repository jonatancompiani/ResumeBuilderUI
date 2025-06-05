"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, Plus, Trash2, Download, AlertCircle, Sparkles, Zap } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

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
import { LanguageCard } from "@/components/language-card"
import { LanguageForm } from "@/components/language-form"
import { useToast } from "@/hooks/use-toast"
import { ColorSelector } from "@/components/color-selector"

// Form schema with more flexible validation
const formSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(1, { message: "Name is required." }),
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Please enter a valid email address." }),
    phone: z.string().min(1, { message: "Phone number is required." }),
    location: z.string().min(1, { message: "Location is required." }),
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

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  hover: { scale: 1.02, y: -4 },
}

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
}

export default function ResumeBuilder() {
  const { theme } = useTheme()
  const { toast } = useToast()
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
        if (data.colors.length > 0 && !selectedColor) {
          setSelectedColor(data.colors[0])
        }
      } else {
        throw new Error("Invalid color data received")
      }
    } catch (error) {
      console.error("Error fetching colors:", error)
      setColorError(error.message || "Failed to load colors")
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
      const previewReader = new FileReader()

      previewReader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      }
      previewReader.readAsDataURL(file)

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
    form.setValue("personalInfo.fullName", data.fullName || "")
    form.setValue("personalInfo.email", data.email || "")
    form.setValue("personalInfo.linkedin", data.linkedinUrl || "")

    if (data.profilePicture) {
      setAvatarPreview(data.profilePicture)
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
    const validWorkExperiences = data.workExperiences.filter(
      (exp) => exp.company.trim() && exp.position.trim() && exp.startDate.trim() && exp.endDate.trim(),
    )

    const validEducation = data.education.filter(
      (edu) => edu.institution.trim() && edu.degree.trim() && edu.startDate.trim() && edu.endDate.trim(),
    )

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
      toast({
        title: "Color Selection Required",
        description: "Please select a theme color before generating your resume.",
        variant: "destructive",
      })
      return
    }

    const cleanedData = validateAndCleanData(data)

    if (cleanedData.workExperiences.length === 0) {
      toast({
        title: "Work Experience Required",
        description: "Please add at least one complete work experience entry.",
        variant: "destructive",
      })
      setActiveTab("experience")
      return
    }

    if (cleanedData.education.length === 0) {
      toast({
        title: "Education Required",
        description: "Please add at least one complete education entry.",
        variant: "destructive",
      })
      setActiveTab("education")
      return
    }

    if (cleanedData.skills.length === 0) {
      toast({
        title: "Skills Required",
        description: "Please add at least one skill.",
        variant: "destructive",
      })
      setActiveTab("skills")
      return
    }

    if (cleanedData.languages.length === 0) {
      toast({
        title: "Languages Required",
        description: "Please add at least one language.",
        variant: "destructive",
      })
      setActiveTab("languages")
      return
    }

    setFormData(cleanedData)
    setIsSubmitting(true)
    try {
      const apiRequestData = createApiRequestData(cleanedData)

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

      const responseData = await response.json()

      if (responseData.success && responseData.imageData) {
        const imageUrl = `data:image/png;base64,${responseData.imageData}`
        setResumeImage(imageUrl)
        setActiveTab("preview")
        toast({
          title: "Resume Generated",
          description: "Your resume has been generated successfully!",
        })
      } else {
        throw new Error("Failed to get resume image data")
      }
    } catch (error) {
      console.error("Error submitting resume:", error)
      toast({
        title: "Generation Failed",
        description: `Failed to generate resume: ${error.message || "Unknown error"}`,
        variant: "destructive",
      })
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

      const contentType = response.headers.get("Content-Type")

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json()

        if (!data.success || !data.pdfData) {
          throw new Error("No PDF data received from the server")
        }

        try {
          const base64Data = data.pdfData

          if (!/^[A-Za-z0-9+/]*={0,2}$/.test(base64Data)) {
            throw new Error("Invalid PDF data format")
          }

          const binaryString = atob(base64Data)
          const bytes = new Uint8Array(binaryString.length)
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i)
          }

          const pdfBlob = new Blob([bytes], { type: "application/pdf" })

          if (pdfBlob.size === 0) {
            throw new Error("Generated PDF is empty")
          }

          const url = window.URL.createObjectURL(pdfBlob)
          const link = document.createElement("a")
          link.href = url
          link.download = `${formData.personalInfo.fullName.replace(/\s+/g, "_")}_resume.pdf`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)

          toast({
            title: "PDF Downloaded",
            description: "Your resume PDF has been downloaded successfully!",
          })
        } catch (decodeError) {
          console.error("Error decoding PDF data:", decodeError)
          throw new Error(`Failed to process PDF data: ${decodeError.message}`)
        }
      } else {
        const pdfBlob = await response.blob()

        if (pdfBlob.size === 0) {
          throw new Error("Received empty PDF file")
        }

        const url = window.URL.createObjectURL(pdfBlob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${formData.personalInfo.fullName.replace(/\s+/g, "_")}_resume.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        toast({
          title: "PDF Downloaded",
          description: "Your resume PDF has been downloaded successfully!",
        })
      }
    } catch (error) {
      console.error("Error downloading PDF:", error)
      toast({
        title: "Download Failed",
        description: `Failed to download PDF: ${error.message || "Unknown error"}`,
        variant: "destructive",
      })
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
    <motion.section
      aria-label="Resume Builder Tool"
      className="max-w-4xl mx-auto"
      initial="initial"
      animate="animate"
      variants={pageVariants}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="sr-only">Resume Builder Form</h2>

      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-pink-400/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TabsList className="grid grid-cols-3 sm:grid-cols-6 mb-6 sm:mb-8 overflow-x-auto glass-effect border-0 shadow-lg">
            {[
              { value: "personal", label: "Personal", icon: "👤" },
              { value: "experience", label: "Experience", icon: "💼" },
              { value: "education", label: "Education", icon: "🎓" },
              { value: "skills", label: "Skills", icon: "⚡" },
              { value: "languages", label: "Languages", icon: "🌍" },
              { value: "preview", label: "Preview", icon: "👁️" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="relative text-xs sm:text-sm transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
              >
                <span className="hidden sm:inline mr-2">{tab.icon}</span>
                {tab.label}
                {tabErrors[tab.value] && (
                  <motion.span
                    className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-red-500 dark:bg-red-400"
                    aria-hidden="true"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </motion.div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.error("Form validation errors:", errors)
              toast({
                title: "Form Incomplete",
                description: "Please fill in all required fields before generating your resume.",
                variant: "destructive",
              })
              navigateToFirstErrorTab()
            })}
          >
            {/* Personal Information */}
            <TabsContent value="personal">
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <Card className="hover-lift glass-effect border-0 shadow-xl">
                  <CardContent className="pt-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse-glow">
                          <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Personal Information
                          </h3>
                          <p className="text-sm text-muted-foreground">Tell us about yourself</p>
                        </div>
                      </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        className="col-span-1 md:col-span-2 mb-6"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        <Label htmlFor="profile-picture" className="text-base font-medium">
                          Profile Picture
                        </Label>
                        <div className="flex flex-col sm:flex-row gap-4 items-start mt-3">
                          <motion.div
                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0 shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <img
                              src={avatarPreview || "/placeholder.svg?height=112&width=112"}
                              alt="Profile preview"
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                          <div className="flex-1">
                            <Input
                              id="profile-picture"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="cursor-pointer text-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                            />
                            <p className="text-sm text-muted-foreground mt-2">
                              Upload a professional profile picture for your resume
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="col-span-1 md:col-span-2 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        <LinkedInImportButton
                          onDataReceived={handleLinkedInData}
                          className="w-full sm:w-auto interactive-scale"
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                          Import your profile information directly from LinkedIn using OpenID Connect
                        </p>
                      </motion.div>

                      {[
                        { name: "personalInfo.fullName", label: "Full Name", placeholder: "John Doe", type: "text" },
                        {
                          name: "personalInfo.email",
                          label: "Email",
                          placeholder: "john.doe@example.com",
                          type: "email",
                        },
                        { name: "personalInfo.phone", label: "Phone", placeholder: "+1 (555) 123-4567", type: "text" },
                        { name: "personalInfo.location", label: "Location", placeholder: "New York, NY", type: "text" },
                        {
                          name: "personalInfo.linkedin",
                          label: "LinkedIn",
                          placeholder: "https://linkedin.com/in/username",
                          type: "text",
                        },
                        {
                          name: "personalInfo.github",
                          label: "GitHub",
                          placeholder: "https://github.com/username",
                          type: "text",
                        },
                      ].map((field, index) => (
                        <motion.div
                          key={field.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 * index }}
                        >
                          <FormField
                            control={form.control}
                            name={field.name}
                            render={({ field: formField }) => (
                              <FormItem>
                                <FormLabel className="text-base font-medium">{field.label}</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder={field.placeholder}
                                    type={field.type}
                                    className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 hover:border-blue-400 focus:scale-[1.02]"
                                    {...formField}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                      ))}

                      <motion.div
                        className="col-span-1 md:col-span-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                      >
                        <FormField
                          control={form.control}
                          name="personalInfo.summary"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">Professional Summary</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Briefly describe your professional background and goals"
                                  className="min-h-[120px] transition-all duration-300 focus:ring-2 focus:ring-blue-500 hover:border-blue-400 resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      className="flex justify-end mt-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                    >
                      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Button
                          type="button"
                          onClick={() => setActiveTab("experience")}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                        >
                          Next: Work Experience
                          <Zap className="ml-2 h-4 w-4" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Work Experience */}
            <TabsContent value="experience">
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <Card className="hover-lift glass-effect border-0 shadow-xl">
                  <CardContent className="pt-6">
                    <motion.div
                      className="flex justify-between items-center mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse-glow">
                          <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Work Experience
                          </h3>
                          <p className="text-sm text-muted-foreground">Showcase your professional journey</p>
                        </div>
                      </div>

                      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Button
                          type="button"
                          onClick={() => {
                            setShowExperienceForm(true)
                            setEditingExperienceIndex(null)
                            addWorkExperience()
                          }}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Experience
                        </Button>
                      </motion.div>
                    </motion.div>

                    {/* Display existing experiences as cards */}
                    <div className="space-y-4 mb-6">
                      <AnimatePresence>
                        {form.watch("workExperiences").map((experience, index) => {
                          if (editingExperienceIndex === index || (!experience.company && !experience.position)) {
                            return null
                          }

                          return (
                            <motion.div
                              key={index}
                              layout
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ExperienceCard
                                experience={experience}
                                index={index}
                                onEdit={(idx) => {
                                  setEditingExperienceIndex(idx)
                                  setShowExperienceForm(true)
                                }}
                                onDelete={removeWorkExperience}
                              />
                            </motion.div>
                          )
                        })}
                      </AnimatePresence>
                    </div>

                    {/* Show message if no experiences */}
                    {form.watch("workExperiences").length === 0 && !showExperienceForm && (
                      <motion.div
                        className="text-center py-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mb-4">
                          <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                        </div>
                        <p className="text-muted-foreground">
                          No work experiences added yet. Click "Add Experience" to get started.
                        </p>
                      </motion.div>
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

                    <motion.div
                      className="flex justify-between mt-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setActiveTab("personal")}
                          className="interactive-scale"
                        >
                          Previous: Personal Info
                        </Button>
                      </motion.div>
                      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Button
                          type="button"
                          onClick={() => setActiveTab("education")}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                        >
                          Next: Education
                          <Zap className="ml-2 h-4 w-4" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Education */}
            <TabsContent value="education">
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <Card className="hover-lift glass-effect border-0 shadow-xl">
                  <CardContent className="pt-6">
                    <motion.div
                      className="flex justify-between items-center mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 animate-pulse-glow">
                          <Sparkles className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                            Education
                          </h3>
                          <p className="text-sm text-muted-foreground">Share your academic achievements</p>
                        </div>
                      </div>

                      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Button
                          type="button"
                          onClick={() => {
                            setShowEducationForm(true)
                            setEditingEducationIndex(null)
                            addEducation()
                          }}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Education
                        </Button>
                      </motion.div>
                    </motion.div>

                    {/* Display existing education as cards */}
                    <div className="space-y-4 mb-6">
                      <AnimatePresence>
                        {form.watch("education").map((education, index) => {
                          if (editingEducationIndex === index || (!education.institution && !education.degree)) {
                            return null
                          }

                          return (
                            <motion.div
                              key={index}
                              layout
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.3 }}
                            >
                              <EducationCard
                                education={education}
                                index={index}
                                onEdit={(idx) => {
                                  setEditingEducationIndex(idx)
                                  setShowEducationForm(true)
                                }}
                                onDelete={removeEducation}
                              />
                            </motion.div>
                          )
                        })}
                      </AnimatePresence>
                    </div>

                    {/* Show message if no education */}
                    {form.watch("education").length === 0 && !showEducationForm && (
                      <motion.div
                        className="text-center py-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-full flex items-center justify-center mb-4">
                          <Sparkles className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <p className="text-muted-foreground">
                          No education entries added yet. Click "Add Education" to get started.
                        </p>
                      </motion.div>
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

                    <motion.div
                      className="flex justify-between mt-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setActiveTab("experience")}
                          className="interactive-scale"
                        >
                          Previous: Work Experience
                        </Button>
                      </motion.div>
                      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Button
                          type="button"
                          onClick={() => setActiveTab("skills")}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                        >
                          Next: Skills
                          <Zap className="ml-2 h-4 w-4" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Skills */}
            <TabsContent value="skills">
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <Card className="hover-lift glass-effect border-0 shadow-xl">
                  <CardContent className="pt-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="mb-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse-glow">
                            <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              Skills & Expertise
                            </h3>
                            <p className="text-sm text-muted-foreground">Add your technical and professional skills</p>
                          </div>
                        </div>

                        <motion.div
                          className="gradient-border p-6 rounded-xl"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                              <Input
                                placeholder="Enter a skill (e.g., JavaScript, Project Management)"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                className="pr-12 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 focus:scale-[1.02]"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault()
                                    addSkill()
                                  }
                                }}
                              />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
                                  Enter
                                </kbd>
                              </div>
                            </div>
                            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                              <Button
                                type="button"
                                onClick={addSkill}
                                disabled={!newSkill.trim()}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Skill
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Skills Display */}
                      <div className="space-y-4">
                        {form.watch("skills").length > 0 ? (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                Your Skills ({form.watch("skills").length})
                              </h4>
                              {form.watch("skills").length > 0 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => form.setValue("skills", [])}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 interactive-scale"
                                >
                                  Clear All
                                </Button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              <AnimatePresence>
                                {form.watch("skills").map((skill, index) => (
                                  <motion.div
                                    key={`${skill}-${index}`}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                                    transition={{
                                      duration: 0.2,
                                      delay: index * 0.05,
                                      type: "spring",
                                      stiffness: 300,
                                      damping: 25,
                                    }}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    className="group relative"
                                  >
                                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600 glass-effect">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate pr-2">
                                          {skill}
                                        </span>
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                                          onClick={() => removeSkill(index)}
                                        >
                                          <Trash2 className="h-3 w-3" />
                                          <span className="sr-only">Remove {skill}</span>
                                        </Button>
                                      </div>
                                      <div className="mt-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-200" />
                                    </div>
                                  </motion.div>
                                ))}
                              </AnimatePresence>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-center py-12"
                          >
                            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mb-4 animate-float">
                              <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                              No skills added yet
                            </h4>
                            <p className="text-muted-foreground mb-4">
                              Start building your skill set by adding your first skill above
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center text-xs text-muted-foreground">
                              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">JavaScript</span>
                              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">React</span>
                              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Project Management</span>
                              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Communication</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">Examples of skills you can add</p>
                          </motion.div>
                        )}
                      </div>

                      <motion.div
                        className="flex justify-between mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setActiveTab("education")}
                            className="interactive-scale"
                          >
                            Previous: Education
                          </Button>
                        </motion.div>
                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                          <Button
                            type="button"
                            onClick={() => setActiveTab("languages")}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                          >
                            Next: Languages
                            <Zap className="ml-2 h-4 w-4" />
                          </Button>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Languages */}
            <TabsContent value="languages">
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <Card className="hover-lift glass-effect border-0 shadow-xl">
                  <CardContent className="pt-6">
                    <motion.div
                      className="flex justify-between items-center mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 animate-pulse-glow">
                          <Sparkles className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            Languages
                          </h3>
                          <p className="text-sm text-muted-foreground">Showcase your language proficiency</p>
                        </div>
                      </div>

                      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Button
                          type="button"
                          onClick={() => {
                            setShowLanguageForm(true)
                            setEditingLanguageIndex(null)
                            addLanguage()
                          }}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Language
                        </Button>
                      </motion.div>
                    </motion.div>

                    {/* Display existing languages as cards */}
                    <div className="space-y-4 mb-6">
                      <AnimatePresence>
                        {form.watch("languages").map((language, index) => {
                          if (editingLanguageIndex === index || (!language.language && !language.proficiency)) {
                            return null
                          }

                          return (
                            <motion.div
                              key={index}
                              layout
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.3 }}
                            >
                              <LanguageCard
                                language={language}
                                index={index}
                                onEdit={(idx) => {
                                  setEditingLanguageIndex(idx)
                                  setShowLanguageForm(true)
                                }}
                                onDelete={removeLanguage}
                              />
                            </motion.div>
                          )
                        })}
                      </AnimatePresence>
                    </div>

                    {/* Show message if no languages */}
                    {form.watch("languages").length === 0 && !showLanguageForm && (
                      <motion.div
                        className="text-center py-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-full flex items-center justify-center mb-4">
                          <Sparkles className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                        </div>
                        <p className="text-muted-foreground">
                          No languages added yet. Click "Add Language" to get started.
                        </p>
                      </motion.div>
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

                    <motion.div
                      className="flex justify-between mt-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setActiveTab("skills")}
                          className="interactive-scale"
                        >
                          Previous: Skills
                        </Button>
                      </motion.div>
                      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Button
                          type="button"
                          onClick={() => setActiveTab("preview")}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                        >
                          Next: Preview
                          <Zap className="ml-2 h-4 w-4" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Preview */}
            <TabsContent value="preview">
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <Card className="hover-lift glass-effect border-0 shadow-xl">
                  <CardContent className="pt-6">
                    {/* Theme Color Selection */}
                    <motion.div
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ColorSelector
                        availableColors={availableColors}
                        selectedColor={selectedColor}
                        onColorSelect={setSelectedColor}
                        onRefreshColors={fetchAvailableColors}
                        isLoading={isLoadingColors}
                        error={colorError}
                      />
                    </motion.div>

                    {resumeImage ? (
                      <motion.div
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 animate-pulse-glow">
                            <Sparkles className="h-6 w-6 text-green-600 dark:text-green-400" />
                          </div>
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            Your Resume
                          </h3>
                        </div>

                        <motion.div
                          className="border rounded-lg overflow-hidden shadow-2xl dark:border-gray-700 hover-lift"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <img
                            src={resumeImage || "/placeholder.svg"}
                            alt="Preview of your generated resume"
                            className="max-w-full h-auto"
                            style={{ maxHeight: "800px" }}
                          />
                        </motion.div>

                        <motion.div
                          className="flex flex-wrap gap-3 sm:gap-4 mt-8 justify-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                            <Button
                              type="button"
                              onClick={() => {
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
                              className="text-xs sm:text-sm px-3 sm:px-4 py-2 h-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg"
                            >
                              <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                              Download PNG
                            </Button>
                          </motion.div>

                          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                            <Button
                              type="button"
                              variant="secondary"
                              onClick={handleDownloadPdf}
                              disabled={isDownloadingPdf}
                              className="text-xs sm:text-sm px-3 sm:px-4 py-2 h-auto shadow-lg hover:shadow-xl"
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
                          </motion.div>

                          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                            <Button
                              type="submit"
                              disabled={isSubmitting || !selectedColor}
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-xs sm:text-sm px-3 sm:px-4 py-2 h-auto shadow-lg"
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                                  Generating Preview...
                                </>
                              ) : (
                                <>
                                  <Sparkles className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                  Regenerate Resume
                                </>
                              )}
                            </Button>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="text-center py-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mb-6 animate-float">
                          <Sparkles className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          Ready to Create Your Resume?
                        </h3>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                          Fill out the form and click "Generate Resume" to create your professional resume.
                        </p>

                        <motion.div
                          className="flex flex-wrap gap-4 justify-center"
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <Button
                            type="submit"
                            disabled={isSubmitting || !selectedColor}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl px-8 py-3 text-lg"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Generating Preview...
                              </>
                            ) : (
                              <>
                                <Sparkles className="mr-2 h-5 w-5" />
                                Generate Resume
                              </>
                            )}
                          </Button>
                        </motion.div>

                        {!selectedColor && (
                          <motion.div
                            className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-600 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400 flex items-center gap-3 max-w-md mx-auto"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                          >
                            <AlertCircle className="h-5 w-5 flex-shrink-0" />
                            <p className="text-sm">Please select a theme color before generating your resume.</p>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </motion.section>
  )
}
