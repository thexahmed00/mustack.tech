'use client'

import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import AnimatedText from '@/components/ui/AnimatedText'
import AnimatedForm from '@/components/ui/AnimatedForm'

const ReactiveBackground = dynamic(() => import('@/components/three/ReactiveBackground'), {
  ssr: false,
})

const CTABand = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const formFields = [
    { name: 'name', type: 'text' as const, placeholder: 'Your Name', required: true },
    { name: 'email', type: 'email' as const, placeholder: 'Your Email', required: true },
    { name: 'company', type: 'text' as const, placeholder: 'Company Name' },
    { name: 'message', type: 'textarea' as const, placeholder: 'Tell us about your project...', required: true, rows: 4 },
  ]

  const handleFormSubmit = async (data: Record<string, string>) => {
    // Handle form submission
    console.log('Form submitted:', data)
    // Add your form submission logic here
  }

  return (
    <section id="contact" className="relative section-padding bg-white text-black overflow-hidden">
      {/* Reactive Background */}
      <div className="absolute inset-0 opacity-10">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            className="three-canvas"
          >
            <ReactiveBackground
              mousePosition={mousePosition}
              isTyping={isTyping}
              color="#000000"
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="circuit"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 10h5v-5h5v5h5v5h-5v5h-5v-5H0z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <circle cx="5" cy="5" r="1" fill="currentColor" />
              <circle cx="15" cy="15" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <AnimatedText
            animationType="glitch"
            className="text-display font-display font-normal text-black mb-6"
            delay={0.2}
          >
            Ready to Transform Your Business?
          </AnimatedText>

          {/* Subheading */}
          <AnimatedText
            animationType="fadeUp"
            className="text-xl md:text-2xl text-black/80 mb-12 leading-relaxed"
            delay={0.4}
          >
            Let's discuss how our AI-powered solutions can scale and modernize
            your technology infrastructure.
          </AnimatedText>

          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mb-12"
          >
            <AnimatedForm
              fields={formFields}
              onSubmit={handleFormSubmit}
              onTyping={setIsTyping}
            />
          </motion.div>

          {/* Scheduling Widget Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="text-center">
              <p className="text-black/60 mb-4 font-display">
                Or schedule a call directly
              </p>
              <motion.button
                className="inline-flex items-center px-6 py-3 border border-black/20 text-black hover:bg-black hover:text-white transition-all duration-300 font-display text-sm uppercase tracking-wider"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule Meeting
              </motion.button>
            </div>

            {/* Alternative Contact Methods */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-black/60">
              <a
                href="mailto:hello@mustack.ai"
                className="flex items-center hover:text-black transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@mustack.ai
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center hover:text-black transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 (555) 123-4567
              </a>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="mt-16 pt-12 border-t border-black/10"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-display font-bold text-black mb-2">24/7</div>
                <div className="text-black/60 text-sm uppercase tracking-wider">Support</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-black mb-2">ISO 27001</div>
                <div className="text-black/60 text-sm uppercase tracking-wider">Certified</div>
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-black mb-2">30 Days</div>
                <div className="text-black/60 text-sm uppercase tracking-wider">Free Trial</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CTABand
