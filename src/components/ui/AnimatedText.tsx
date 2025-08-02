'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  animationType?: 'fadeUp' | 'lineBreak' | 'typewriter' | 'glitch'
}

const AnimatedText = ({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.8,
  animationType = 'fadeUp'
}: AnimatedTextProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [displayText, setDisplayText] = useState('')
  const text = typeof children === 'string' ? children : ''

  // Typewriter effect
  useEffect(() => {
    if (animationType === 'typewriter' && isInView && text) {
      let currentIndex = 0
      const timer = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(timer)
        }
      }, 50)
      return () => clearInterval(timer)
    }
  }, [isInView, text, animationType])

  const getAnimationVariants = () => {
    switch (animationType) {
      case 'fadeUp':
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }
      
      case 'lineBreak':
        return {
          hidden: { opacity: 0, scaleX: 0 },
          visible: { opacity: 1, scaleX: 1 }
        }
      
      case 'glitch':
        return {
          hidden: { 
            opacity: 0, 
            x: -10,
            filter: 'blur(4px)'
          },
          visible: { 
            opacity: 1, 
            x: 0,
            filter: 'blur(0px)'
          }
        }
      
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }
    }
  }

  if (animationType === 'typewriter') {
    return (
      <div ref={ref} className={className}>
        {displayText}
        {isInView && displayText.length < text.length && (
          <span className="animate-pulse">|</span>
        )}
      </div>
    )
  }

  if (animationType === 'lineBreak') {
    return (
      <div ref={ref} className={`relative ${className}`}>
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={getAnimationVariants()}
          transition={{ duration, delay, ease: 'easeOut' }}
          className="origin-left"
        >
          {children}
        </motion.div>
        
        {/* Animated line break */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
          className="absolute bottom-0 left-0 h-0.5 bg-white origin-left"
          style={{ width: '100%' }}
        />
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getAnimationVariants()}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Specialized component for splitting text into words/lines
const AnimatedTextSplit = ({ 
  children, 
  className = '',
  splitBy = 'words',
  staggerDelay = 0.1
}: {
  children: string
  className?: string
  splitBy?: 'words' | 'lines' | 'chars'
  staggerDelay?: number
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  const splitText = () => {
    switch (splitBy) {
      case 'words':
        return children.split(' ')
      case 'lines':
        return children.split('\n')
      case 'chars':
        return children.split('')
      default:
        return [children]
    }
  }

  const textArray = splitText()

  return (
    <div ref={ref} className={className}>
      {textArray.map((item, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ 
            duration: 0.6, 
            delay: index * staggerDelay,
            ease: 'easeOut'
          }}
          className="inline-block"
        >
          {item}
          {splitBy === 'words' && index < textArray.length - 1 && ' '}
        </motion.span>
      ))}
    </div>
  )
}

export { AnimatedTextSplit }
export default AnimatedText
