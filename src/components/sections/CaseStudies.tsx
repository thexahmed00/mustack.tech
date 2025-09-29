'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import AnimatedText from '@/components/ui/AnimatedText'
import { PlusCounter, PercentageCounter } from '@/components/ui/AnimatedCounter'

// Detailed Case Study View Component
const DetailedCaseStudyView = ({ caseStudy, onClose }: {
  caseStudy: any,
  onClose: () => void
}) => {
  return (
    <div className="relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Header */}
      <div className="p-8 border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-normal mb-4">
            {caseStudy.title}
          </h2>
          <p className="text-xl text-white/70 mb-6">{caseStudy.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60">
            <span>Client: {caseStudy.client}</span>
            <span>•</span>
            <span>Industry: {caseStudy.industry}</span>
            <span>•</span>
            <span>Duration: {caseStudy.projectDuration}</span>
            <span>•</span>
            <span>Team: {caseStudy.teamSize}</span>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-12">
        {/* Project Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-2xl font-display font-normal mb-4 text-white/90">
            Project Overview
          </h3>
          <p className="text-white/70 leading-relaxed text-lg mb-8">
            {caseStudy.overview}
          </p>

          {/* Visual Showcase */}
          <motion.div
            className="relative max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-xl overflow-hidden shadow-2xl">
              {/* Browser Chrome */}
              <div className="bg-white/10 border-b border-white/10 px-4 py-3 flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400/60 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400/60 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400/60 rounded-full"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white/5 rounded px-3 py-1 text-xs text-white/60 font-mono">
                    {caseStudy.websiteUrl}
                  </div>
                </div>
              </div>

              {/* Screenshot with hover effects */}
              <motion.div
                className="relative aspect-video group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={caseStudy.images.desktop}
                  alt={`${caseStudy.title} Desktop View`}
                  fill
                  className="object-cover transition-all duration-500 group-hover:opacity-90"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />

                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Floating visit button */}
                <motion.a
                  href={caseStudy.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-sm text-white/90 hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center space-x-2">
                    <span>Visit Live Site</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </motion.a>
              </motion.div>

              {/* Subtle glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-xl blur-sm opacity-30 -z-10" />
            </div>

            {/* Caption */}
            <motion.div
              className="text-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-white/60 text-sm font-display uppercase tracking-wider">
                Live Website Preview
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Technologies Used */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-display font-normal mb-6 text-white/90">
            Technologies Used
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {caseStudy.technologies.map((tech: string, index: number) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 transition-colors"
              >
                <span className="text-sm font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Challenges & Solutions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div>
            <h3 className="text-2xl font-display font-normal mb-6 text-white/90">
              Challenges
            </h3>
            <ul className="space-y-4">
              {caseStudy.challenges.map((challenge: string, index: number) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-white/70">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-display font-normal mb-6 text-white/90">
              Solutions
            </h3>
            <ul className="space-y-4">
              {caseStudy.solutions.map((solution: string, index: number) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-white/70">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Results & Metrics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-display font-normal mb-6 text-white/90">
            Results & Impact
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-medium mb-4 text-white/80">Key Outcomes</h4>
              <ul className="space-y-3">
                {caseStudy.results.map((result: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-white/70">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4 text-white/80">Performance Metrics</h4>
              <div className="space-y-4">
                {Object.entries(caseStudy.metrics).map(([key, value]: [string, any]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-white/70 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-white font-medium">
                      {typeof value === 'number' && value > 10 ? `+${value}%` : `${value}${typeof value === 'number' && value <= 10 ? '%' : ''}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Testimonial */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-lg p-8"
        >
          <blockquote className="text-xl text-white/80 italic mb-6 leading-relaxed">
            "{caseStudy.testimonial.quote}"
          </blockquote>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
              <span className="text-lg font-medium">
                {caseStudy.testimonial.author.split(' ').map((n: string) => n[0]).join('')}
              </span>
            </div>
            <div>
              <div className="font-medium text-white">{caseStudy.testimonial.author}</div>
              <div className="text-white/60 text-sm">{caseStudy.testimonial.position}</div>
              <div className="text-white/60 text-sm">{caseStudy.testimonial.company}</div>
            </div>
          </div>
        </motion.section>

        {/* Visit Website */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <a
            href={caseStudy.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-white text-black hover:bg-white/90 transition-colors font-display text-sm uppercase tracking-wider"
          >
            Visit Live Website
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.section>
      </div>
    </div>
  )
}

const CaseStudies = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null)
  const [showDetailedView, setShowDetailedView] = useState(false)

  const clients = [
    'TECHCORP', 'INNOVATE', 'DIGITECH', 'FUTURESOFT', 'NEXUSAI', 
    'CLOUDTECH', 'DATAFLOW', 'SMARTSYS', 'AUTOMATE', 'SCALABLE'
  ]

  // Detailed case studies data
  const detailedCaseStudies = [
    {
      id: 'syeds-investments',
      title: 'SyedsInvestments.com',
      subtitle: 'Financial Education Platform',
      overview: 'A comprehensive financial education platform providing accessible, accurate, and Shariah-compliant financial education for Indian and U.S. stock markets.',
      client: 'Syeds Investments',
      industry: 'Financial Services',
      projectDuration: '4 months',
      teamSize: '3 developers',
      technologies: [
        'Next.js 14',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Node.js',
        'MongoDB',
        'Vercel',
        'SEO Optimization'
      ],
      challenges: [
        'Creating an intuitive interface for complex financial data',
        'Ensuring Shariah-compliance in all financial recommendations',
        'Building a scalable content management system',
        'Implementing real-time market data integration',
        'Optimizing for both Indian and US market audiences'
      ],
      solutions: [
        'Developed a clean, modern interface with clear navigation and educational content hierarchy',
        'Implemented Shariah-compliance filters and verification systems',
        'Built a custom CMS for easy content updates and market analysis publishing',
        'Integrated real-time APIs for live market data and stock information',
        'Created region-specific content sections with localized market insights'
      ],
      results: [
        'Increased user engagement by 250% within first 3 months',
        'Achieved 95+ Lighthouse performance score',
        'Built a growing community of 5,000+ active learners',
        'Established authority in Shariah-compliant investing education',
        'Generated 40% increase in consultation bookings'
      ],
      metrics: {
        performanceScore: 95,
        userGrowth: 250,
        engagementIncrease: 300,
        conversionRate: 40
      },
      testimonial: {
        quote: "Mustack.ai delivered exactly what we envisioned - a platform that makes complex financial concepts accessible to everyone while maintaining our Islamic values. The user experience is exceptional.",
        author: "Syed Ashraf",
        position: "Founder",
        company: "Syeds Investments"
      },
      websiteUrl: 'https://www.syedsinvestments.com',
      images: {
        desktop: '/syd-desktop.png'
      },
      featured: true
    },
    {
      id: 'black-luxury-rentals',
      title: 'BlackLuxuryRentals.com',
      subtitle: 'Premium Car Rental Platform',
      overview: 'A sophisticated luxury car rental platform offering premium vehicles with seamless booking experience and exceptional customer service.',
      client: 'Black Luxury Rentals',
      industry: 'Automotive/Hospitality',
      projectDuration: '3 months',
      teamSize: '4 developers',
      technologies: [
        'React',
        'Next.js',
        'TypeScript',
        'Stripe API',
        'Google Maps API',
        'Tailwind CSS',
        'PostgreSQL',
        'AWS S3',
        'Cloudinary'
      ],
      challenges: [
        'Creating an elegant booking system for luxury vehicles',
        'Implementing secure payment processing for high-value rentals',
        'Building a comprehensive fleet management system',
        'Ensuring mobile-first responsive design',
        'Integrating location-based services and GPS tracking'
      ],
      solutions: [
        'Designed a premium booking interface with detailed vehicle showcases and availability calendars',
        'Integrated Stripe for secure, PCI-compliant payment processing with deposit handling',
        'Developed an admin dashboard for fleet management, maintenance tracking, and booking oversight',
        'Created a fully responsive design optimized for mobile booking experiences',
        'Implemented Google Maps integration for pickup/dropoff locations and real-time tracking'
      ],
      results: [
        'Streamlined booking process reduced abandonment rate by 60%',
        'Increased online bookings by 180% in first quarter',
        'Achieved 98% customer satisfaction rating',
        'Reduced administrative overhead by 45%',
        'Expanded service area coverage by 200%'
      ],
      metrics: {
        bookingIncrease: 180,
        customerSatisfaction: 98,
        adminEfficiency: 45,
        serviceExpansion: 200
      },
      testimonial: {
        quote: "The platform Mustack.ai built for us is simply outstanding. Our customers love the seamless booking experience, and we've seen remarkable growth in our business.",
        author: "Marcus Johnson",
        position: "CEO",
        company: "Black Luxury Rentals"
      },
      websiteUrl: 'https://www.blackluxuryrentals.com',
      images: {
        desktop: '/car-rental-desktop.png'
      },
      featured: true
    }
  ]

  const testimonials = [
    {
      quote: "Mustack.ai delivered exactly what we envisioned - a platform that makes complex financial concepts accessible to everyone while maintaining our Islamic values. The user experience is exceptional.",
      author: "Syed Ashraf",
      position: "Founder, Syeds Investments",
      company: "Syeds Investments",
      caseStudyLink: "#case-study-syeds-investments"
    },
    {
      quote: "The platform Mustack.ai built for us is simply outstanding. Our customers love the seamless booking experience, and we've seen remarkable growth in our business.",
      author: "Alex Costa",
      position: "CEO, Black Luxury Rentals",
      company: "Black Luxury Rentals",
      caseStudyLink: "#case-study-black-luxury-rentals"
    },
    // {
    //   quote: "Working with Mustack.ai was a game-changer. Their rapid deployment approach got our mobile app to market 60% faster than projected, without compromising on quality.",
    //   author: "Emily Watson",
    //   position: "Product Director",
    //   company: "DigiTech",
    //   caseStudyLink: "#case-study-digitech"
    // }
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
                <motion.button
                  onClick={() => {
                    const caseStudyId = testimonials[currentTestimonial].caseStudyLink.replace('#case-study-', '')
                    setSelectedCaseStudy(caseStudyId)
                    setShowDetailedView(true)
                  }}
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
                </motion.button>
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

      {/* Detailed Case Study Modal */}
      <AnimatePresence>
        {showDetailedView && selectedCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto"
            onClick={() => setShowDetailedView(false)}
          >
            <div className="min-h-screen py-8 px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="max-w-6xl mx-auto bg-black border border-white/10 rounded-lg"
                onClick={(e) => e.stopPropagation()}
              >
                {detailedCaseStudies
                  .filter(study => study.id === selectedCaseStudy)
                  .map(study => (
                    <DetailedCaseStudyView
                      key={study.id}
                      caseStudy={study}
                      onClose={() => setShowDetailedView(false)}
                    />
                  ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
