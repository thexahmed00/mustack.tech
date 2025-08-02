'use client'

import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import AnimatedText from '@/components/ui/AnimatedText'
import AnimatedForm from '@/components/ui/AnimatedForm'
import emailjs from '@emailjs/browser'

const ReactiveBackground = dynamic(() => import('@/components/three/ReactiveBackground'), {
  ssr: false,
})

const CTABand = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isTyping, setIsTyping] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Initialize EmailJS
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    if (publicKey) {
      emailjs.init(publicKey)
    }
  }, [])

  const formFields = [
    { name: 'name', type: 'text' as const, placeholder: 'Your Name', required: true },
    { name: 'email', type: 'email' as const, placeholder: 'Your Email', required: true },
    { name: 'company', type: 'text' as const, placeholder: 'Company Name' },
    { name: 'message', type: 'textarea' as const, placeholder: 'Tell us about your project...', required: true, rows: 4 },
  ]

  const handleFormSubmit = async (data: Record<string, string>) => {
    try {
      setSubmitStatus('idle')

      // Get EmailJS configuration from environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        console.error('EmailJS configuration missing:', { serviceId, templateId, publicKey: publicKey ? 'Present' : 'Missing' })
        setSubmitStatus('error')
        setTimeout(() => setSubmitStatus('idle'), 5000)
        return
      }

      console.log('EmailJS config:', { serviceId, templateId, publicKey: publicKey ? 'Present' : 'Missing' })

      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        company: data.company || 'Not provided',
        message: data.message,
        to_email: 'hello@mustack.ai', // Your email address
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey)

      setSubmitStatus('success')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('Email sending failed:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="relative section-padding bg-black text-white overflow-hidden">
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
              color="#ffffff"
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
              darkTheme={true}
            />

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-400 font-display text-sm uppercase tracking-wider">Message Sent!</span>
                </div>
                <p className="text-white/70 text-sm">Thank you for reaching out. We'll get back to you within 24 hours.</p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-red-400 font-display text-sm uppercase tracking-wider">Send Failed</span>
                </div>
                <p className="text-white/70 text-sm">Sorry, there was an error sending your message. Please try again or contact us directly.</p>
              </motion.div>
            )}
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
              <p className="text-white/60 mb-4 font-display">
                Or schedule a call directly
              </p>
              <motion.button
                className="inline-flex items-center px-6 py-3 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 font-display text-sm uppercase tracking-wider"
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
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/60">
              <a
                href="mailto:hello@mustack.ai"
                className="flex items-center hover:text-white transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@mustack.ai
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center hover:text-white transition-colors"
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
