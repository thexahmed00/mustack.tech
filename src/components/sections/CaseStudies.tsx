'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedText from '@/components/ui/AnimatedText'
import { PlusCounter, PercentageCounter } from '@/components/ui/AnimatedCounter'

const CaseStudies = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const clients = [
    'TECHCORP', 'INNOVATE', 'DIGITECH', 'FUTURESOFT', 'NEXUSAI', 
    'CLOUDTECH', 'DATAFLOW', 'SMARTSYS', 'AUTOMATE', 'SCALABLE'
  ]

  const testimonials = [
    {
      quote: "Mustack.ai transformed our legacy systems into a modern, AI-powered platform that increased our operational efficiency by 300%. Their expertise in system modernization is unmatched.",
      author: "Sarah Chen",
      position: "CTO, TechCorp",
      company: "TechCorp",
      caseStudyLink: "#case-study-techcorp"
    },
    {
      quote: "The custom software solution delivered by Mustack.ai exceeded our expectations. The AI automation features have revolutionized how we handle customer interactions.",
      author: "Michael Rodriguez",
      position: "Head of Digital Innovation",
      company: "Innovate Solutions",
      caseStudyLink: "#case-study-innovate"
    },
    {
      quote: "Working with Mustack.ai was a game-changer. Their rapid deployment approach got our mobile app to market 60% faster than projected, without compromising on quality.",
      author: "Emily Watson",
      position: "Product Director",
      company: "DigiTech",
      caseStudyLink: "#case-study-digitech"
    }
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isPaused, testimonials.length])

  return (
    <section id="case-studies" className="section-padding bg-black">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedText
            animationType="glitch"
            className="text-display font-display font-normal mb-6"
            delay={0.2}
          >
            Trusted by Industry Leaders
          </AnimatedText>
          <AnimatedText
            animationType="fadeUp"
            className="text-body text-white/80 max-w-3xl mx-auto"
            delay={0.4}
          >
            See how we've helped organizations across industries scale and modernize
            their technology infrastructure.
          </AnimatedText>
        </div>

        {/* Enhanced Client Logos Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20 overflow-hidden"
        >
          <div className="relative">
            <div className="flex animate-scroll-left">
              {/* First set */}
              {clients.map((client, index) => (
                <motion.div
                  key={`first-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 mx-8 text-2xl font-display font-normal text-white/30 hover:text-white/80 transition-all duration-500 hover:scale-110 cursor-pointer"
                  style={{ minWidth: '150px' }}
                  whileHover={{
                    textShadow: '0 0 20px rgba(255,255,255,0.5)',
                    filter: 'brightness(1.2)'
                  }}
                >
                  {client}
                </motion.div>
              ))}
              {/* Duplicate set for seamless loop */}
              {clients.map((client, index) => (
                <motion.div
                  key={`second-${index}`}
                  className="flex-shrink-0 mx-8 text-2xl font-display font-normal text-white/30 hover:text-white/80 transition-all duration-500 hover:scale-110 cursor-pointer"
                  style={{ minWidth: '150px' }}
                  whileHover={{
                    textShadow: '0 0 20px rgba(255,255,255,0.5)',
                    filter: 'brightness(1.2)'
                  }}
                >
                  {client}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-center"
              >
                {/* Quote */}
                <blockquote className="text-xl md:text-2xl leading-relaxed text-white/90 mb-8 font-light">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>

                {/* Author */}
                <div className="space-y-2 mb-6">
                  <div className="text-lg font-display font-normal text-white">
                    {testimonials[currentTestimonial].author}
                  </div>
                  <div className="text-white/60">
                    {testimonials[currentTestimonial].position}
                  </div>
                  <div className="text-white/40 text-sm uppercase tracking-wider font-display">
                    {testimonials[currentTestimonial].company}
                  </div>
                </div>

                {/* Case Study Link */}
                <motion.a
                  href={testimonials[currentTestimonial].caseStudyLink}
                  className="inline-flex items-center text-white/70 hover:text-white transition-colors group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm uppercase tracking-wider font-display">
                    Read Case Study
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
                </motion.a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Testimonial Navigation */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-white scale-110'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Enhanced Stats with Animated Counters */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 pt-20 border-t border-white/10">
          {/* Projects Delivered */}
          <div className="text-center">
            <PlusCounter
              end={50}
              icon={
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              }
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="text-white/60 uppercase tracking-wider text-sm font-display mt-2"
            >
              Projects Delivered
            </motion.div>
          </div>

          {/* Efficiency Gain */}
          <div className="text-center">
            <PercentageCounter
              end={300}
              icon={
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                </svg>
              }
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 2.7 }}
              className="text-white/60 uppercase tracking-wider text-sm font-display mt-2"
            >
              Average Efficiency Gain
            </motion.div>
          </div>

          {/* Uptime */}
          <div className="text-center">
            <PercentageCounter
              end={99.9}
              icon={
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              }
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 3.2 }}
              className="text-white/60 uppercase tracking-wider text-sm font-display mt-2"
            >
              Uptime Guarantee
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default CaseStudies
