'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FormField {
  name: string
  type: 'text' | 'email' | 'textarea'
  placeholder: string
  required?: boolean
  rows?: number
}

interface AnimatedFormProps {
  fields: FormField[]
  onSubmit: (data: Record<string, string>) => void
  onTyping?: (isTyping: boolean) => void
  className?: string
  darkTheme?: boolean
}

const AnimatedForm = ({ fields, onSubmit, onTyping, className = '', darkTheme = false }: AnimatedFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const typingTimeoutRef = useRef<NodeJS.Timeout>()

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }

    // Notify parent about typing activity
    if (onTyping) {
      onTyping(true)
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = setTimeout(() => {
        onTyping(false)
      }, 1000)
    }
  }

  const handleFocus = (name: string) => {
    setFocusedField(name)
  }

  const handleBlur = () => {
    setFocusedField(null)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    fields.forEach(field => {
      if (field.required && !formData[field.name]?.trim()) {
        newErrors[field.name] = `${field.placeholder} is required`
      }
      
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Please enter a valid email address'
        }
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      await onSubmit(formData)
      // Reset form on success
      setFormData({})
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (field: FormField) => {
    const isActive = focusedField === field.name || formData[field.name]
    const hasError = !!errors[field.name]

    return (
      <motion.div
        key={field.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Animated Label */}
        <motion.label
          animate={{
            y: isActive ? -25 : 0,
            scale: isActive ? 0.85 : 1,
            color: hasError ? '#ef4444' : (isActive ? (darkTheme ? '#ffffff' : '#000000') : (darkTheme ? '#999999' : '#666666'))
          }}
          transition={{ duration: 0.2 }}
          className="absolute left-6 top-4 pointer-events-none origin-left font-display"
        >
          {field.placeholder}
        </motion.label>

        {/* Input Field */}
        {field.type === 'textarea' ? (
          <motion.textarea
            name={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            onFocus={() => handleFocus(field.name)}
            onBlur={handleBlur}
            rows={field.rows || 4}
            className={`w-full px-6 py-4 bg-transparent border-2 transition-all duration-300 resize-none font-sans ${
              hasError
                ? 'border-red-500 focus:border-red-500'
                : darkTheme
                  ? 'border-white/20 focus:border-white text-white placeholder-transparent'
                  : 'border-black/20 focus:border-black text-black placeholder-transparent'
            } focus:outline-none`}
            required={field.required}
          />
        ) : (
          <motion.input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            onFocus={() => handleFocus(field.name)}
            onBlur={handleBlur}
            className={`w-full px-6 py-4 bg-transparent border-2 transition-all duration-300 font-sans ${
              hasError
                ? 'border-red-500 focus:border-red-500'
                : darkTheme
                  ? 'border-white/20 focus:border-white text-white placeholder-transparent'
                  : 'border-black/20 focus:border-black text-black placeholder-transparent'
            } focus:outline-none`}
            required={field.required}
          />
        )}

        {/* Animated Border Glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: focusedField === field.name
              ? darkTheme
                ? '0 0 0 3px rgba(255, 255, 255, 0.1)'
                : '0 0 0 3px rgba(0, 0, 0, 0.1)'
              : '0 0 0 0px rgba(0, 0, 0, 0)'
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Error Message */}
        <AnimatePresence>
          {hasError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-6 left-0 text-red-500 text-sm font-display"
            >
              {errors[field.name]}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-8 ${className}`}>
      {fields.map(renderField)}
      
      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className={`group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 border-2 transition-all duration-300 font-display text-sm uppercase tracking-wider ${
          darkTheme
            ? 'border-white text-white hover:bg-white hover:text-black'
            : 'border-black text-black hover:bg-black hover:text-white'
        }`}
        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
      >
        <span className="relative z-10 font-display">
          {isSubmitting ? 'SENDING...' : 'GET IN TOUCH'}
        </span>

        {/* Animated background */}
        <motion.div
          className={`absolute inset-0 ${darkTheme ? 'bg-white' : 'bg-black'}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isSubmitting ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ originX: 0 }}
        />

        {/* Loading indicator */}
        <AnimatePresence>
          {isSubmitting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              <div className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${
                darkTheme ? 'border-black' : 'border-white'
              }`} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </form>
  )
}

export default AnimatedForm
