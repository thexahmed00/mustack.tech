import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import './globals.css'

// Dynamic imports for performance
const PerformanceMonitor = dynamic(() => import('@/components/ui/PerformanceMonitor'), {
  ssr: false,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Note: Bitcount Prop Single will be loaded via CSS import for better compatibility
// as it may not be available in Next.js font optimization yet

export const metadata: Metadata = {
  title: 'Mustack.ai - Revolutionize Your Tech Stack With AI',
  description: 'AI-First Engineering, Rapid Deployment, Enterprise-Grade Security. Scale and modernize your business with Mustack.ai.',
  keywords: 'AI, software development, tech stack, modernization, enterprise, automation',
  authors: [{ name: 'Mustack.ai' }],
  creator: 'Mustack.ai',
  publisher: 'Mustack.ai',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mustack.ai'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Mustack.ai - Revolutionize Your Tech Stack With AI',
    description: 'AI-First Engineering, Rapid Deployment, Enterprise-Grade Security',
    url: 'https://mustack.ai',
    siteName: 'Mustack.ai',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Mustack.ai - AI-Powered Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mustack.ai - Revolutionize Your Tech Stack With AI',
    description: 'AI-First Engineering, Rapid Deployment, Enterprise-Grade Security',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="bg-black text-white antialiased overflow-x-hidden">
        {children}
        <PerformanceMonitor />
      </body>
    </html>
  )
}
