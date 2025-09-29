'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import AnimatedText from '@/components/ui/AnimatedText'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const footerLinks = [
    {
      title: 'Solutions',
      links: [
        { name: 'Custom Software', href: '#solutions' },
        { name: 'AI Automation', href: '#solutions' },
        { name: 'Mobile & Web Apps', href: '#solutions' },
        { name: 'System Modernization', href: '#solutions' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '#about' },
        { name: 'Case Studies', href: '#case-studies' },
        { name: 'Careers', href: '#careers' },
        { name: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '#blog' },
        { name: 'Documentation', href: '#docs' },
        { name: 'Support', href: '#support' },
        { name: 'Privacy Policy', href: '#privacy' },
      ],
    },
  ]

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/mustack-ai',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/mustack.ai/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
  ]

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Handle newsletter subscription
      console.log('Newsletter subscription:', email)
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Dynamic CTA Banner */}
      <div className="bg-white text-black py-8">
        <div className="container-custom text-center">
          <AnimatedText
            animationType="fadeUp"
            className="text-xl md:text-2xl font-display font-normal mb-4"
          >
            Let's build the future of your business together →
          </AnimatedText>
          <motion.a
            href="#contact"
            className="inline-flex items-center px-6 py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 font-display text-sm uppercase tracking-wider"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Project
          </motion.a>
        </div>
      </div>
      {/* Circuit Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="footer-circuit"
              x="0"
              y="0"
              width="15"
              height="15"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 7.5h3.75v-3.75h3.75v3.75h3.75v3.75h-3.75v3.75h-3.75v-3.75H0z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
              />
              <circle cx="3.75" cy="3.75" r="0.5" fill="currentColor" />
              <circle cx="11.25" cy="11.25" r="0.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-circuit)" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Left Column - Brand */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <Link
                  href="/"
                  className="flex items-center space-x-3 hover:opacity-80 transition-opacity mb-4"
                >
                  <Image
                    src="/logo.png"
                    alt="Mustack.ai Logo"
                    width={48}
                    height={48}
                    className="rounded-sm"
                  />
                  <span className="text-3xl font-bold font-display tracking-tight">
                    MUSTACK.AI
                  </span>
                </Link>
                <p className="text-white/70 max-w-md leading-relaxed">
                  Revolutionizing business through AI-powered solutions.
                  Scale and modernize your technology infrastructure with our expert team.
                </p>
              </div>

              {/* Enhanced Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 relative group"
                    aria-label={social.name}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: '0 0 20px rgba(255,255,255,0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded" />
                  </motion.a>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-3 text-sm text-white/70">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  hello@mustack.tech
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 701 391 8402
                </div>
              </div>
            </motion.div>

            {/* Middle Column - Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {footerLinks.map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-normal uppercase tracking-wider mb-4 font-display">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-white/70 hover:text-white transition-colors text-sm hover:underline"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>

            {/* Right Column - Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-sm font-normal uppercase tracking-wider mb-4 font-display">
                  Stay Updated
                </h3>
                <p className="text-white/70 text-sm mb-6">
                  Get the latest insights on AI, software development, and digital transformation.
                </p>
              </div>

              {/* Newsletter Signup */}
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:border-white/40 focus:outline-none transition-colors font-sans text-sm"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full px-4 py-3 bg-white text-black hover:bg-white/90 transition-colors font-display text-sm uppercase tracking-wider"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubscribed}
                >
                  {isSubscribed ? 'SUBSCRIBED!' : 'SUBSCRIBE'}
                </motion.button>
              </form>

              {/* Blog Tease */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-sm font-normal mb-2 font-display">Latest from our blog:</h4>
                <Link
                  href="#blog"
                  className="text-white/70 hover:text-white text-sm hover:underline transition-colors"
                >
                  "The Future of AI in Enterprise Software Development"
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/10 py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-white/60">
              © {currentYear} Mustack.ai. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-white/60">
              <Link href="#privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
