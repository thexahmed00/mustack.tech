'use client'

import { motion } from 'framer-motion'

interface AnimatedIconProps {
  type: 'code' | 'ai' | 'mobile' | 'system'
  isHovered: boolean
  className?: string
}

const AnimatedIcon = ({ type, isHovered, className = '' }: AnimatedIconProps) => {
  const iconVariants = {
    idle: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 360 },
  }

  const pathVariants = {
    idle: { pathLength: 1, opacity: 1 },
    hover: { pathLength: [0, 1], opacity: [0.5, 1] },
  }

  const renderIcon = () => {
    switch (type) {
      case 'code':
        return (
          <svg className={`w-8 h-8 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <motion.path
              variants={pathVariants}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        )
      
      case 'ai':
        return (
          <svg className={`w-8 h-8 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <motion.path
              variants={pathVariants}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        )
      
      case 'mobile':
        return (
          <svg className={`w-8 h-8 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <motion.path
              variants={pathVariants}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"
            />
          </svg>
        )
      
      case 'system':
        return (
          <svg className={`w-8 h-8 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <motion.path
              variants={pathVariants}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        )
      
      default:
        return null
    }
  }

  return (
    <motion.div
      variants={iconVariants}
      animate={isHovered ? 'hover' : 'idle'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {renderIcon()}
    </motion.div>
  )
}

export default AnimatedIcon
