'use client'

import { useEffect } from 'react'

const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime)
        }
        if (entry.entryType === 'first-input') {
          console.log('FID:', (entry as any).processingStart - entry.startTime)
        }
        if (entry.entryType === 'layout-shift') {
          if (!(entry as any).hadRecentInput) {
            console.log('CLS:', (entry as any).value)
          }
        }
      })
    })

    // Observe different entry types
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
      observer.observe({ entryTypes: ['first-input'] })
      observer.observe({ entryTypes: ['layout-shift'] })
    } catch (e) {
      // Some browsers might not support all entry types
      console.warn('Performance monitoring not fully supported')
    }

    // Monitor memory usage (if available)
    if ('memory' in performance) {
      const memoryInfo = (performance as any).memory
      console.log('Memory usage:', {
        used: Math.round(memoryInfo.usedJSHeapSize / 1048576) + ' MB',
        total: Math.round(memoryInfo.totalJSHeapSize / 1048576) + ' MB',
        limit: Math.round(memoryInfo.jsHeapSizeLimit / 1048576) + ' MB',
      })
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}

export default PerformanceMonitor
