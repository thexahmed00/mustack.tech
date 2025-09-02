'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import TypewriterText from '@/components/ui/TypewriterText'
import AnimatedScrollArrow from '@/components/ui/AnimatedScrollArrow'
import Link from 'next/link'
import Image from 'next/image'

// Dynamic import for Three.js components
const DualBackground = dynamic(() => import('@/components/three/DualBackground'), {
  ssr: false,
})

// Removed ScrollIndicator - replaced with AnimatedScrollArrow

const Hero = () => {
  const [showSubheading, setShowSubheading] = useState(false)
  const [showCTAs, setShowCTAs] = useState(false)

  return (
    <section className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden py-8 sm:py-0 hero-mobile-spacing">
      {/* Dual Background: Globe + 3D Logo + Particle Wave */}
      <DualBackground
        showGlobe={false}
        showLogo={false}
        showParticleWave={true}
        globeOpacity={0.3}
        // logoOpacity={0.35}
        particleWaveOpacity={1}
        useWireframeLogo={false}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-8 sm:mb-12 flex flex-col items-center space-y-4 sm:space-y-6"
        >
          {/* <Image
            src="/logo.png"
            alt="Mustack.tech Logo"
            width={120}
            height={120}
            className="rounded-lg shadow-2xl"
            priority
          /> */}
          {/* <div className="text-2xl sm:text-4xl md:text-6xl font-bold font-display tracking-tight">
            MUSTACK.TECH
          </div> */}
        </motion.div>

        {/* Main Headline with Typewriter Effect */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-semibold leading-tight sm:leading-none px-2 sm:px-0">
            <TypewriterText
              text="Future-Proof Software. Built Just for You"
              delay={1000}
              speed={70}
              onComplete={() => setShowSubheading(true)}
            />
          </h1>
        </div>

        {/* Subheading */}
        {showSubheading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-8 sm:mb-12"
            onAnimationComplete={() => setShowCTAs(true)}
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed px-2">
              AI-First Engineering • Rapid Deployment • Enterprise-Grade Security
            </p>
          </motion.div>
        )}

        {/* Call-to-Action Buttons */}
        {showCTAs && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
          >
            <Link
              href="#contact"
              className="btn-primary group relative overflow-hidden w-full sm:w-auto text-sm sm:text-base"
            >
              <span className="relative z-10">SCHEDULE A DEMO</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>

            <Link
              href="#solutions"
              className="btn-primary bg-transparent border-white/50 text-white/80 hover:border-white hover:text-white w-full sm:w-auto text-sm sm:text-base"
            >
              EXPLORE CAPABILITIES
            </Link>
          </motion.div>
        )}
      </div>

      {/* Animated Scroll Arrow */}
      <AnimatedScrollArrow />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
    </section>
  )
}

export default Hero
