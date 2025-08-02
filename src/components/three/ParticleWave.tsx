'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleWaveProps {
  particleCount?: number
  waveHeight?: number
  waveWidth?: number
  color?: string
  opacity?: number
  animationSpeed?: number
  position?: [number, number, number]
}

const ParticleWave = ({
  particleCount = 5000, // Will be overridden by responsive logic
  waveHeight = 2,
  waveWidth = 8,
  color = '#40E0D0', // Teal/cyan color matching the screenshot
  opacity = 0.6,
  animationSpeed = 0.5,
  position = [0, -2, 0]
}: ParticleWaveProps) => {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 })
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  // Responsive window size tracking
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setWindowSize({ width, height })

      // Determine device type for performance optimization
      if (width < 768) {
        setDeviceType('mobile')
      } else if (width < 1024) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Responsive configuration based on device type
  const getResponsiveConfig = () => {
    switch (deviceType) {
      case 'mobile':
        return {
          particleCount: Math.min(2000, particleCount), // Reduced for mobile performance
          particleSize: 0.018, // Slightly larger for visibility
          waveHeight: waveHeight * 0.8,
          waveWidth: waveWidth * 0.7,
          layerCount: 2, // Fewer layers for performance
          animationIntensity: 0.7, // Reduced animation complexity
          updateFrequency: 2 // Update every 2 frames instead of every frame
        }
      case 'tablet':
        return {
          particleCount: Math.min(3500, particleCount), // Medium density
          particleSize: 0.015,
          waveHeight: waveHeight * 0.9,
          waveWidth: waveWidth * 0.85,
          layerCount: 3, // Medium layer count
          animationIntensity: 0.85,
          updateFrequency: 1
        }
      default: // desktop
        return {
          particleCount: particleCount,
          particleSize: 0.015,
          waveHeight: waveHeight,
          waveWidth: waveWidth,
          layerCount: 4, // Full layer count
          animationIntensity: 1,
          updateFrequency: 1
        }
    }
  }

  const config = getResponsiveConfig()

  // Generate particle positions in a wave/arc pattern with fixed buffer size
  const { positions, originalPositions, actualParticleCount } = useMemo(() => {
    // Always use the maximum particle count for buffer allocation to prevent resizing
    const maxParticleCount = 5000
    const actualParticleCount = config.particleCount
    const positions = new Float32Array(maxParticleCount * 3)
    const originalPositions = new Float32Array(maxParticleCount * 3)

    // Generate particles up to the actual count needed
    for (let i = 0; i < maxParticleCount; i++) {
      const i3 = i * 3

      // Only generate visible particles for the actual count needed
      if (i < actualParticleCount) {
        // Create responsive wave pattern with device-optimized distribution
        const x = (Math.random() - 0.5) * config.waveWidth
        const z = (Math.random() - 0.5) * config.waveWidth * 0.8

        // Create the curved arc shape with responsive density
        const distanceFromCenter = Math.sqrt(x * x + z * z)
        const normalizedDistance = Math.min(distanceFromCenter / (config.waveWidth * 0.5), 1)

        // Enhanced wave function with responsive height
        const waveY = Math.sin(Math.PI * (1 - normalizedDistance)) * config.waveHeight

        // Reduced randomness for denser, more defined wave
        const randomOffset = (Math.random() - 0.5) * 0.15
        const y = waveY + randomOffset

        // More inclusive threshold for denser particle distribution
        if (y > -0.1) {
          positions[i3] = x
          positions[i3 + 1] = Math.max(y, 0) // Ensure particles stay above ground
          positions[i3 + 2] = z

          // Store original positions for animation
          originalPositions[i3] = x
          originalPositions[i3 + 1] = Math.max(y, 0)
          originalPositions[i3 + 2] = z
        } else {
          // Place particles below visible area if they don't fit the wave
          positions[i3] = x
          positions[i3 + 1] = -5
          positions[i3 + 2] = z

          originalPositions[i3] = x
          originalPositions[i3 + 1] = -5
          originalPositions[i3 + 2] = z
        }
      } else {
        // Hide excess particles by placing them far below
        positions[i3] = 0
        positions[i3 + 1] = -100
        positions[i3 + 2] = 0

        originalPositions[i3] = 0
        originalPositions[i3 + 1] = -100
        originalPositions[i3 + 2] = 0
      }
    }
    
    return { positions, originalPositions, actualParticleCount }
  }, [config.particleCount, config.waveHeight, config.waveWidth, deviceType])

  // Optimized animation loop with performance considerations
  useFrame((state, delta) => {
    // Skip frames on mobile for better performance
    if (deviceType === 'mobile' && Math.floor(state.clock.elapsedTime * 60) % config.updateFrequency !== 0) {
      return
    }

    if (pointsRef.current && pointsRef.current.geometry.attributes.position) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      const time = state.clock.elapsedTime * animationSpeed * config.animationIntensity

      // Only animate the actual particles that should be visible
      for (let i = 0; i < actualParticleCount; i++) {
        const i3 = i * 3

        // Get original position
        const originalX = originalPositions[i3]
        const originalY = originalPositions[i3 + 1]
        const originalZ = originalPositions[i3 + 2]

        // Only animate visible particles (those in the wave)
        if (originalY > -4) {
          // Responsive animation intensity
          const intensity = config.animationIntensity
          const floatOffset = Math.sin(time + i * 0.01) * 0.05 * intensity
          const waveOffset = Math.sin(time * 0.5 + originalX * 0.1) * 0.1 * intensity

          positions[i3] = originalX + Math.sin(time * 0.3 + i * 0.02) * 0.02 * intensity
          positions[i3 + 1] = originalY + floatOffset + waveOffset
          positions[i3 + 2] = originalZ + Math.cos(time * 0.2 + i * 0.015) * 0.02 * intensity
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }

    // Subtle opacity pulsing (reduced on mobile)
    if (materialRef.current) {
      const pulseIntensity = deviceType === 'mobile' ? 0.1 : 0.2
      materialRef.current.opacity = opacity * (0.8 + Math.sin(state.clock.elapsedTime * 2) * pulseIntensity)
    }
  })

  return (
    <group position={position}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={5000} // Always use max count for buffer, but only render actualParticleCount
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={materialRef}
          color={color}
          size={config.particleSize}
          transparent
          opacity={opacity}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
          vertexColors={false}
        />
      </points>
      
      {/* Responsive additional particle layers with fixed buffer sizes */}
      {config.layerCount >= 2 && (
        <points position={[0, 0.15, -0.3]} scale={0.9}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={4000} // Fixed buffer size
              array={positions.slice(0, 4000 * 3)}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            color={color}
            size={config.particleSize * 0.8}
            transparent
            opacity={opacity * 0.7}
            sizeAttenuation={true}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}

      {/* Mid-layer for depth - only on tablet and desktop */}
      {config.layerCount >= 3 && (
        <points position={[0, 0.1, -0.2]} scale={0.95}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={3000} // Fixed buffer size
              array={positions.slice(0, 3000 * 3)}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            color={color}
            size={config.particleSize * 0.6}
            transparent
            opacity={opacity * 0.4}
            sizeAttenuation={true}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}

      {/* Subtle glow layer - desktop only */}
      {config.layerCount >= 4 && (
        <points position={[0, 0, 0]} scale={1.05}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2000} // Fixed buffer size
              array={positions.slice(0, 2000 * 3)}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            color={color}
            size={config.particleSize * 1.3}
            transparent
            opacity={opacity * 0.3}
            sizeAttenuation={true}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </group>
  )
}

export default ParticleWave
