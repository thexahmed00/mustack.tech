'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'
import { createIntersectionObserver } from '@/lib/utils'

interface LazyLoadProps {
  children: ReactNode
  fallback?: ReactNode
  rootMargin?: string
  threshold?: number
  className?: string
}

const LazyLoad = ({ 
  children, 
  fallback = null, 
  rootMargin = '50px',
  threshold = 0.1,
  className = ''
}: LazyLoadProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = createIntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsVisible(true)
            setHasLoaded(true)
            observer?.unobserve(element)
          }
        })
      },
      { rootMargin, threshold }
    )

    if (observer) {
      observer.observe(element)
    }

    return () => {
      if (observer && element) {
        observer.unobserve(element)
      }
    }
  }, [rootMargin, threshold, hasLoaded])

  return (
    <div ref={elementRef} className={className}>
      {isVisible ? children : fallback}
    </div>
  )
}

export default LazyLoad
