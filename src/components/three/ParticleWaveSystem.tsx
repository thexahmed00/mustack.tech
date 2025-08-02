'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const ParticleWaveSystem = () => {
  const waveSystemRef = useRef<THREE.Group>(null)
  const waveLayersRef = useRef<(THREE.Points | null)[]>([])
  const coreRef = useRef<THREE.Mesh>(null)

  // Generate 3D particle wave system
  const waveSystem = useMemo(() => {
    const waveLayers: any[] = []
    
    // Create 5 distinct wave layers with different characteristics
    const layerConfigs = [
      { 
        y: 0.8, 
        amplitude: 0.6, 
        frequency: 1.2, 
        speed: 0.8, 
        particleCount: 1200,
        direction: 1,
        waveLength: 4.0,
        particleSize: 0.008,
        opacity: 0.8
      },
      { 
        y: 0.3, 
        amplitude: 0.8, 
        frequency: 0.9, 
        speed: 1.2, 
        particleCount: 1000,
        direction: -1,
        waveLength: 3.5,
        particleSize: 0.006,
        opacity: 0.7
      },
      { 
        y: 0, 
        amplitude: 1.0, 
        frequency: 1.5, 
        speed: 0.6, 
        particleCount: 1400,
        direction: 1,
        waveLength: 5.0,
        particleSize: 0.01,
        opacity: 0.9
      },
      { 
        y: -0.3, 
        amplitude: 0.7, 
        frequency: 1.1, 
        speed: 1.0, 
        particleCount: 900,
        direction: -1,
        waveLength: 3.8,
        particleSize: 0.007,
        opacity: 0.6
      },
      { 
        y: -0.8, 
        amplitude: 0.5, 
        frequency: 1.3, 
        speed: 1.4, 
        particleCount: 800,
        direction: 1,
        waveLength: 3.2,
        particleSize: 0.005,
        opacity: 0.5
      }
    ]

    // Generate particle positions for each wave layer
    layerConfigs.forEach((config, layerIndex) => {
      const positions = new Float32Array(config.particleCount * 3)
      const originalPositions = new Float32Array(config.particleCount * 3)
      
      for (let i = 0; i < config.particleCount; i++) {
        const i3 = i * 3
        
        // Distribute particles across the wave surface
        const x = (Math.random() - 0.5) * config.waveLength * 2
        const z = (Math.random() - 0.5) * config.waveLength
        const y = config.y + (Math.random() - 0.5) * 0.1 // Small random variation
        
        positions[i3] = x
        positions[i3 + 1] = y
        positions[i3 + 2] = z
        
        // Store original positions for wave calculations
        originalPositions[i3] = x
        originalPositions[i3 + 1] = y
        originalPositions[i3 + 2] = z
      }
      
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      
      waveLayers.push({
        config,
        positions,
        originalPositions,
        geometry,
        layerIndex
      })
    })

    return { waveLayers, layerConfigs }
  }, [])

  // Animation loop
  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Rotate the entire wave system gently
    if (waveSystemRef.current) {
      waveSystemRef.current.rotation.y = time * 0.1
      waveSystemRef.current.rotation.x = Math.sin(time * 0.3) * 0.05
    }

    // Animate central core
    if (coreRef.current && coreRef.current.material) {
      const material = coreRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.3 + Math.sin(time * 2) * 0.2
      coreRef.current.scale.setScalar(1 + Math.sin(time * 1.5) * 0.1)
    }

    // Animate each wave layer
    waveLayersRef.current.forEach((pointsRef, layerIndex) => {
      if (pointsRef && waveSystem.waveLayers[layerIndex]) {
        const layer = waveSystem.waveLayers[layerIndex]
        const config = layer.config
        const positions = pointsRef.geometry.attributes.position.array as Float32Array
        const originalPositions = layer.originalPositions

        // Update particle positions to create wave motion
        for (let i = 0; i < config.particleCount; i++) {
          const i3 = i * 3
          const originalX = originalPositions[i3]
          const originalZ = originalPositions[i3 + 2]
          
          // Calculate wave displacement
          const wavePhase = time * config.speed * config.direction
          const waveX = originalX / config.waveLength * config.frequency + wavePhase
          const waveZ = originalZ / config.waveLength * config.frequency * 0.5 + wavePhase * 0.7
          
          const waveHeight = Math.sin(waveX) * Math.cos(waveZ) * config.amplitude
          const secondaryWave = Math.sin(waveX * 1.3 + wavePhase * 0.8) * 0.3 * config.amplitude
          
          // Apply wave displacement
          positions[i3 + 1] = originalPositions[i3 + 1] + waveHeight + secondaryWave
          
          // Add some horizontal flow
          positions[i3] = originalX + Math.sin(wavePhase + originalZ * 0.1) * 0.1
          positions[i3 + 2] = originalZ + Math.cos(wavePhase + originalX * 0.1) * 0.05
        }
        
        pointsRef.geometry.attributes.position.needsUpdate = true
        
        // Animate material opacity
        if (pointsRef.material) {
          const material = pointsRef.material as THREE.PointsMaterial
          const baseOpacity = config.opacity
          const pulseOpacity = Math.sin(time * 1.5 + layerIndex * 0.5) * 0.2
          material.opacity = baseOpacity + pulseOpacity
        }
      }
    })
  })

  return (
    <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.1}>
      <group ref={waveSystemRef}>
        {/* Central Intelligence Core */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.4}
          />
        </mesh>

        {/* Particle Wave Layers */}
        {waveSystem.waveLayers.map((layer, index) => (
          <points
            key={index}
            ref={(ref) => {
              waveLayersRef.current[index] = ref
            }}
            geometry={layer.geometry}
          >
            <pointsMaterial
              color="#ffffff"
              size={layer.config.particleSize}
              transparent
              opacity={layer.config.opacity}
              sizeAttenuation={true}
              blending={THREE.AdditiveBlending}
            />
          </points>
        ))}

        {/* Subtle Enhancement Rings */}
        {Array.from({ length: 3 }, (_, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, i * Math.PI / 3]}>
            <ringGeometry args={[0.5 + i * 0.2, 0.52 + i * 0.2, 16]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.05}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

export default ParticleWaveSystem
