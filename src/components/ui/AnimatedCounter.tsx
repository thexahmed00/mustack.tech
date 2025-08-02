'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  icon?: React.ReactNode
}

const AnimatedCounter = ({ 
  end, 
  duration = 2, 
  suffix = '', 
  prefix = '',
  className = '',
  icon
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * end)
      
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, end, duration])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`text-center relative ${className}`}
    >
      {/* Background Icon */}
      {icon && (
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <div className="text-8xl">
            {icon}
          </div>
        </div>
      )}
      
      {/* Counter */}
      <div className="relative z-10">
        <motion.div
          className="text-4xl md:text-5xl font-display font-normal text-white mb-2"
          animate={isInView ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, delay: duration }}
        >
          {prefix}{count}{suffix}
        </motion.div>
      </div>
    </motion.div>
  )
}

// Specialized counter for percentages
const PercentageCounter = ({ 
  end, 
  className = '',
  icon
}: { 
  end: number
  className?: string
  icon?: React.ReactNode
}) => {
  return (
    <AnimatedCounter
      end={end}
      suffix="%"
      duration={2.5}
      className={className}
      icon={icon}
    />
  )
}

// Specialized counter for large numbers with + suffix
const PlusCounter = ({ 
  end, 
  className = '',
  icon
}: { 
  end: number
  className?: string
  icon?: React.ReactNode
}) => {
  return (
    <AnimatedCounter
      end={end}
      suffix="+"
      duration={2}
      className={className}
      icon={icon}
    />
  )
}

export { PercentageCounter, PlusCounter }
export default AnimatedCounter
