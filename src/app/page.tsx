import dynamic from 'next/dynamic'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Solutions from '@/components/sections/Solutions'
import CaseStudies from '@/components/sections/CaseStudies'
import CTABand from '@/components/sections/CTABand'
import Footer from '@/components/sections/Footer'

// Dynamic imports for performance
const Navigation = dynamic(() => import('@/components/layout/Navigation'), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <About />
      <Solutions />
      <CaseStudies />
      <CTABand />
      <Footer />
    </main>
  )
}
