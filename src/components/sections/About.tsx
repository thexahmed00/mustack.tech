'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import AnimatedText, { AnimatedTextSplit } from '@/components/ui/AnimatedText'

const SciFiBrain = dynamic(() => import('@/components/three/SciFiBrain'), {
  ssr: false,
})

const About = () => {
  const features = [
    {
      title: 'AI-First Engineering',
      description: 'Leverage cutting-edge artificial intelligence to build smarter, more efficient solutions that adapt and evolve with your business needs.',
    },
    {
      title: 'Rapid Deployment',
      description: 'Get to market faster with our streamlined development process and automated deployment pipelines that reduce time-to-value.',
    },
    {
      title: 'Enterprise-Grade Security',
      description: 'Built with security at its core, our solutions meet the highest industry standards for data protection and compliance.',
    },
  ]

  return (
    <section id="about" className="section-padding bg-black">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <AnimatedTextSplit
                splitBy="words"
                staggerDelay={0.1}
                className="text-display font-display font-normal mb-6"
              >
                Scale and Modernize Your Business
              </AnimatedTextSplit>

              <AnimatedText
                
                delay={0.8}
                className="text-body text-white/80 leading-relaxed"
              >
                At Mustack.ai, we help clients scale and modernize their business through
                innovative AI-powered solutions. Our expertise spans custom software development,
                intelligent automation, and comprehensive system modernization.
              </AnimatedText>
            </div>

            {/* Features */}
            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  viewport={{ once: true }}
                  className="border-l-2 border-white/20 pl-6 hover:border-white/40 transition-colors duration-300"
                >
                  <h3 className="text-heading font-display font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <a
                href="#solutions"
                className="inline-flex items-center text-white hover:text-white/80 transition-colors group"
              >
                <span className="text-sm uppercase tracking-wider font-medium">
                  Explore Our Solutions
                </span>
                <svg
                  className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* 3D Silicon Chip */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="relative h-96 lg:h-[500px]"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="loading-shimmer w-32 h-32 rounded-lg" />
              </div>
            }>
              <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                className="three-canvas interactive"
              >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={0.8} />
                <SciFiBrain />
              </Canvas>
            </Suspense>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-white/20" />
            <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-white/20" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-white/20" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-white/20" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
