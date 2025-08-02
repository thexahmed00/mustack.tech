'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import WireframeGlobe from './WireframeGlobe'
import MustackLogo3D from './MustackLogo3D'
import ParticleWave from './ParticleWave'

interface DualBackgroundProps {
  className?: string
  showGlobe?: boolean
  showLogo?: boolean
  showParticleWave?: boolean
  globeOpacity?: number
  logoOpacity?: number
  particleWaveOpacity?: number
  useWireframeLogo?: boolean
}

const DualBackground = ({
  className = '',
  showGlobe = true,
  showLogo = true,
  showParticleWave = true,
  globeOpacity = 0.3,
  logoOpacity = 0.35,
  particleWaveOpacity = 0.6,
  useWireframeLogo = false
}: DualBackgroundProps) => {
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

  // Responsive positioning for both elements
  const getGlobePosition = (): [number, number, number] => {
    if (windowSize.width < 768) {
      return showLogo ? [0, 1.5, 0] : [0, 0, 0] // Move up if logo is centered
    } else if (windowSize.width < 1024) {
      return [1.5, 0, 0] // Tablet positioning
    } else {
      return [2.5, 0, 0] // Desktop right side
    }
  }

  const getLogoPosition = (): [number, number, number] => {
    if (windowSize.width < 768) {
      return showGlobe ? [0, -1.5, 0] : [0, 0, 0] // Move down if globe is centered above
    } else if (windowSize.width < 1024) {
      return [-1.5, 0, 0] // Tablet positioning
    } else {
      return [-2.7, 0, 0] // Desktop left side
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
          {/* Optimized lighting setup */}
          <ambientLight intensity={0.12} />
          
          {/* Directional lights for both elements */}
          {showGlobe && (
            <directionalLight 
              position={[5, 5, 5]} 
              intensity={0.05} 
              color="#ffffff"
            />
          )}
          
          {showLogo && (
            <directionalLight 
              position={[-5, 5, 5]} 
              intensity={0.08} 
              color="#ffffff"
            />
          )}
          
          {/* Point light for subtle highlights */}
          <pointLight 
            position={[0, 3, 4]} 
            intensity={0.03} 
            color="#ffffff"
            distance={15}
            decay={2}
          />
          
          {/* Wireframe Globe */}
          {showGlobe && (
            <WireframeGlobe
              mousePosition={{ x: 0, y: 0 }} // Disabled mouse parallax
              radius={1.4}
              rotationSpeed={0.002}
              opacity={globeOpacity}
              showConnections={true}
              position={getGlobePosition()}
            />
          )}

          {/* 3D Mustack Logo */}
          {showLogo && (
            <MustackLogo3D
              mousePosition={{ x: 0, y: 0 }} // Disabled mouse parallax
              rotationSpeed={0.0025}
              opacity={logoOpacity}
              position={getLogoPosition()}
              useWireframe={useWireframeLogo}
            />
          )}

          {/* Particle Wave Effect - Now self-optimizing for device performance */}
          {showParticleWave && (
            <ParticleWave
              particleCount={5000} // Component handles responsive optimization internally
              waveHeight={2}
              waveWidth={8}
              opacity={particleWaveOpacity}
              position={[0, -2.5, 0]}
            />
          )}

          {/* Balanced background atmosphere */}
          <BalancedAtmosphere showGlobe={showGlobe} showLogo={showLogo} />
        </Canvas>
      </Suspense>
    </div>
  )
}

// Balanced background particles for both elements
const BalancedAtmosphere = ({ showGlobe, showLogo }: { showGlobe: boolean, showLogo: boolean }) => {
  const particleCount = 80
  const positions = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    let x, y, z
    
    if (showGlobe && showLogo) {
      // Distribute particles across the scene
      x = (Math.random() - 0.5) * 20
      y = (Math.random() - 0.5) * 15
      z = (Math.random() - 0.5) * 10
    } else if (showGlobe) {
      // Concentrate on right side
      x = (Math.random() - 0.2) * 15
      y = (Math.random() - 0.5) * 15
      z = (Math.random() - 0.5) * 8
    } else if (showLogo) {
      // Concentrate on left side
      x = (Math.random() - 0.8) * 15
      y = (Math.random() - 0.5) * 15
      z = (Math.random() - 0.5) * 8
    } else {
      // Center distribution
      x = (Math.random() - 0.5) * 12
      y = (Math.random() - 0.5) * 12
      z = (Math.random() - 0.5) * 6
    }
    
    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
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
        opacity={0.06}
        sizeAttenuation={true}
      />
    </points>
  )
}

export default DualBackground
