'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import MustackLogo3D from './MustackLogo3D'

interface LogoBackgroundProps {
  className?: string
  useWireframe?: boolean
  opacity?: number
  logoPosition?: [number, number, number]
}

const LogoBackground = ({ 
  className = '',
  useWireframe = false,
  opacity = 0.35,
  logoPosition = [-2.7, 0, 0]
}: LogoBackgroundProps) => {
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Responsive positioning
  const getResponsivePosition = (): [number, number, number] => {
    if (windowSize.width < 768) {
      // Mobile: center the logo
      return [0, 0, 0]
    } else if (windowSize.width < 1024) {
      // Tablet: slight left offset
      return [-1.5, 0, 0]
    } else {
      // Desktop: full left offset
      return logoPosition
    }
  }

  if (!isClient) {
    return (
      <div className={`fixed inset-0 bg-black -z-10 ${className}`}>
        {/* Fallback for SSR */}
      </div>
    )
  }

  return (
    <div className={`fixed inset-0 bg-black -z-10 ${className}`}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ 
            position: [0, 0, 5], 
            fov: 60,
            near: 0.1,
            far: 1000
          }}
          className="w-full h-full"
          dpr={[1, 2]} // Optimize for performance
          performance={{ min: 0.5 }} // Maintain 30fps minimum
        >
          {/* Soft ambient lighting */}
          <ambientLight intensity={0.15} />
          
          {/* Subtle directional light for depth */}
          <directionalLight 
            position={[-5, 5, 5]} 
            intensity={0.1} 
            color="#ffffff"
          />
          
          {/* Point light for subtle highlights */}
          <pointLight 
            position={[-3, 2, 3]} 
            intensity={0.05} 
            color="#ffffff"
            distance={10}
            decay={2}
          />
          
          {/* The 3D Mustack logo */}
          <MustackLogo3D
            mousePosition={{ x: 0, y: 0 }} // Disabled mouse parallax
            rotationSpeed={0.0025}
            opacity={opacity}
            position={getResponsivePosition()}
            useWireframe={useWireframe}
          />
          
          {/* Optional: Add subtle background atmosphere */}
          <BackgroundAtmosphere />
        </Canvas>
      </Suspense>
    </div>
  )
}

// Subtle background atmosphere particles
const BackgroundAtmosphere = () => {
  const particleCount = 50
  const positions = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    // Concentrate particles more on the left side where logo is
    positions[i * 3] = (Math.random() - 0.8) * 15     // X: more left-weighted
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15 // Y: centered
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8  // Z: shallow depth
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.008}
        transparent
        opacity={0.08}
        sizeAttenuation={true}
      />
    </points>
  )
}

export default LogoBackground
