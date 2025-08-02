'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import WireframeGlobe from './WireframeGlobe'

interface GlobeBackgroundProps {
  className?: string
  showConnections?: boolean
  globePosition?: [number, number, number]
  opacity?: number
}

const GlobeBackground = ({ 
  className = '',
  showConnections = true,
  globePosition = [2, 0, 0],
  opacity = 0.4
}: GlobeBackgroundProps) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

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
          <ambientLight intensity={0.1} />
          
          {/* Subtle directional light */}
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={0.05} 
            color="#ffffff"
          />
          
          {/* The wireframe globe */}
          <WireframeGlobe
            mousePosition={{ x: 0, y: 0 }} // Disabled mouse parallax
            radius={1.4}
            rotationSpeed={0.002}
            opacity={opacity}
            showConnections={showConnections}
            position={globePosition}
          />
          
          {/* Optional: Add some subtle background particles */}
          <BackgroundParticles />
        </Canvas>
      </Suspense>
    </div>
  )
}

// Optional background particles for extra atmosphere
const BackgroundParticles = () => {
  const particleCount = 100
  const positions = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
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
        size={0.01}
        transparent
        opacity={0.1}
        sizeAttenuation={true}
      />
    </points>
  )
}

export default GlobeBackground
