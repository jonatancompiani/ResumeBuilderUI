"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, RefreshCw, Palette, Check } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface ColorSelectorProps {
  availableColors: string[]
  selectedColor: string
  onColorSelect: (color: string) => void
  onRefreshColors: () => void
  isLoading: boolean
  error: string | null
  className?: string
}

interface ColorSwatchProps {
  color: string
  isSelected: boolean
  onClick: () => void
  index: number
}

const ColorSwatch = ({ color, isSelected, onClick, index }: ColorSwatchProps) => {
  const [isHovered, setIsHovered] = useState(false)

  // Determine if the color is light or dark for better contrast
  const isLightColor = () => {
    const hex = color.replace("#", "")
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return (r * 299 + g * 587 + b * 114) / 1000 > 128
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative w-12 h-12 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
        "shadow-sm hover:shadow-lg transform-gpu",
        isSelected && "ring-2 ring-offset-2 ring-primary shadow-lg scale-105"
      )}
      style={{ backgroundColor: color }}
      aria-label={`Select color ${color}`}
      aria-pressed={isSelected}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: isSelected ? 1.05 : 1 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      whileHover={{ 
        scale: isSelected ? 1.05 : 1.1,
        y: -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Gradient overlay for depth */}
      <div 
        className="absolute inset-0 rounded-xl opacity-20"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0.1) 100%)`
        }}
      />
      
      {/* Selection indicator */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={cn(
              "rounded-full p-1.5 shadow-lg",
              isLightColor() ? "bg-gray-900/80" : "bg-white/90"
            )}>
              <Check className={cn(
                "h-4 w-4",
                isLightColor() ? "text-white" : "text-gray-900"
              )} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover effect */}
      <AnimatePresence>
        {isHovered && !isSelected && (
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Color code tooltip on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md shadow-lg z-10"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            {color.toUpperCase()}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export function ColorSelector({
  availableColors,
  selectedColor,
  onColorSelect,
  onRefreshColors,
  isLoading,
  error,
  className = ""
}: ColorSelectorProps) {
  const { theme } = useTheme()

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn(
              "p-2 rounded-lg",
              theme === "dark" 
                ? "bg-gradient-to-br from-purple-500/20 to-cyan-500/20" 
                : "bg-gradient-to-br from-purple-100 to-cyan-100"
            )}>
              <Palette className={cn(
                "h-5 w-5",
                theme === "dark" ? "text-purple-300" : "text-purple-600"
              )} />
            </div>
            <div>
              <CardTitle className="text-lg">Theme Color</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Choose a color that represents your style
              </p>
            </div>
          </div>
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRefreshColors}
            disabled={isLoading}
            className={cn(
              "transition-all duration-200",
              theme === "dark" 
                ? "hover:bg-gray-800 hover:border-gray-600" 
                : "hover:bg-gray-50 hover:border-gray-300"
            )}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span className="ml-2 hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {error && (
          <motion.div
            className={cn(
              "mb-4 p-3 rounded-lg border text-sm",
              theme === "dark"
                ? "bg-red-900/20 border-red-800/50 text-red-300"
                : "bg-red-50 border-red-200 text-red-600"
            )}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Loading color palette...</p>
            </div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.05 }}
          >
            {availableColors.map((color, index) => (
              <ColorSwatch
                key={color}
                color={color}
                isSelected={selectedColor === color}
                onClick={() => onColorSelect(color)}
                index={index}
              />
            ))}
          </motion.div>
        )}

        {/* Selected color preview */}
        {selectedColor && !isLoading && (
          <motion.div
            className={cn(
              "mt-6 p-4 rounded-lg border",
              theme === "dark"
                ? "bg-gray-800/50 border-gray-700/50"
                : "bg-gray-50/80 border-gray-200/50"
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg shadow-sm border border-white/20"
                style={{ backgroundColor: selectedColor }}
              />
              <div>
                <p className="text-sm font-medium">Selected Color</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {selectedColor.toUpperCase()}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {availableColors.length === 0 && !isLoading && !error && (
          <div className="text-center py-8 text-muted-foreground">
            <Palette className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No colors available</p>
            <p className="text-xs mt-1">Try refreshing to load colors</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
