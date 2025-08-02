'use client'

import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import AnimatedText from '@/components/ui/AnimatedText'

const AnimatedIcon3D = dynamic(() => import('@/components/three/AnimatedIcons'), {
  ssr: false,
})

const Solutions = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const solutions = [
    {
      title: 'Custom Software',
      description: 'Tailored software solutions built with modern technologies and AI-powered features to meet your unique business requirements.',
      icon: 'code' as const,
    },
    {
      title: 'AI Automation',
      description: 'Intelligent automation systems that streamline workflows, reduce manual tasks, and enhance operational efficiency.',
      icon: 'ai' as const,
    },
    {
      title: 'Mobile & Web Apps',
      description: 'Cross-platform applications with responsive design, optimal performance, and seamless user experiences.',
      icon: 'mobile' as const,
    },
    {
      title: 'System Modernization',
      description: 'Legacy system upgrades and cloud migration services to future-proof your technology infrastructure.',
      icon: 'system' as const,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="solutions" className="section-padding bg-black">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedText
            animationType="glitch"
            className="text-display font-display font-normal mb-6"
            delay={0.2}
          >
            Our Solutions
          </AnimatedText>
          <AnimatedText
            animationType="fadeUp"
            className="text-body text-white/80 max-w-3xl mx-auto"
            delay={0.4}
          >
            Comprehensive technology solutions designed to accelerate your digital transformation
            and drive sustainable business growth.
          </AnimatedText>
        </div>

        {/* Solutions Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              variants={cardVariants}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group relative"
            >
              {/* Enhanced Card with Glowing Border */}
              <div className="relative h-80 bg-black border border-white/10 p-8 transition-all duration-500 hover:border-white/50 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-4 hover:scale-105 overflow-hidden">
                {/* Animated Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Animated Border Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Three.js Icon */}
                  <div className="mb-6 h-16 w-16">
                    <Suspense fallback={
                      <div className="w-16 h-16 bg-white/10 rounded animate-pulse" />
                    }>
                      <Canvas
                        camera={{ position: [0, 0, 2], fov: 50 }}
                        className="w-full h-full"
                      >
                        <ambientLight intensity={0.5} />
                        <pointLight position={[2, 2, 2]} intensity={0.8} />
                        <AnimatedIcon3D
                          type={solution.icon}
                          isHovered={hoveredCard === index}
                        />
                      </Canvas>
                    </Suspense>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-semibold mb-4 group-hover:text-white transition-colors">
                    {solution.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-sm leading-relaxed flex-grow group-hover:text-white/90 transition-colors">
                    {solution.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center text-sm text-white hover:text-white/80 transition-colors">
                      Learn More
                      <svg
                        className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
                    </span>
                  </div>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-white/20 group-hover:border-white/60 transition-colors" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-white/20 group-hover:border-white/60 transition-colors" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-white/20 group-hover:border-white/60 transition-colors" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-white/20 group-hover:border-white/60 transition-colors" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="btn-primary"
          >
            DISCUSS YOUR PROJECT
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Solutions
