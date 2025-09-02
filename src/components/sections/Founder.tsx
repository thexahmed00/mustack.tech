'use client'

import { motion } from 'framer-motion'
import AnimatedText, { AnimatedTextSplit } from '@/components/ui/AnimatedText'

const Founder = () => {
  return (
    <section id="founder" className="section-padding bg-black/50">
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
                splitBy="lines"
                staggerDelay={0.1}
                className="text-display font-display font-normal mb-6"
              >
                Leadership &
Vision
              </AnimatedTextSplit>

              <div className="space-y-6">
                <div>
                  <h3 className="text-heading font-display font-semibold mb-2 text-white">
                    Mustafa Ahmed
                  </h3>
                  <p className="text-white/60 text-sm uppercase tracking-wider font-medium mb-4">
                    CEO & Founder
                  </p>
                </div>

                <AnimatedText
                  delay={0.8}
                  className="text-body text-white/80 leading-relaxed"
                >
                  Mustafa brings a unique blend of technical expertise and strategic vision to every challenge, 
                  transforming complex problems into scalable solutions through innovative thinking and cutting-edge technology. 
                  His client-focused approach ensures that every solution not only meets immediate needs but anticipates 
                  future growth, delivering sustainable value that drives long-term success.
                </AnimatedText>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <a
                href="#solutions"
                className="inline-flex items-center text-white hover:text-white/80 transition-colors group"
              >
                <span className="text-sm uppercase tracking-wider font-medium">
                  See Our Work
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

          {/* Profile Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-96 lg:h-[500px] flex items-center justify-center">
              {/* Placeholder for profile image or visual element */}
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center">
                  <div className="text-6xl font-display font-light text-white/40">M</div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-white/20" />
              <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-white/20" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-white/20" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-white/20" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Founder