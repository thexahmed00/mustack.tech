'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface AnimatedIconProps {
  type: 'code' | 'ai' | 'mobile' | 'system'
  isHovered: boolean
}

const CodeIcon = ({ isHovered }: { isHovered: boolean }) => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * (isHovered ? 2 : 0.5)
      groupRef.current.scale.setScalar(isHovered ? 1.2 : 1)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Code brackets */}
        <mesh position={[-0.3, 0, 0]}>
          <boxGeometry args={[0.05, 0.4, 0.05]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.25, 0.15, 0]}>
          <boxGeometry args={[0.15, 0.05, 0.05]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.25, -0.15, 0]}>
          <boxGeometry args={[0.15, 0.05, 0.05]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        
        {/* Right bracket */}
        <mesh position={[0.3, 0, 0]}>
          <boxGeometry args={[0.05, 0.4, 0.05]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.25, 0.15, 0]}>
          <boxGeometry args={[0.15, 0.05, 0.05]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.25, -0.15, 0]}>
          <boxGeometry args={[0.15, 0.05, 0.05]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        
        {/* Code lines */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.2, 0.02, 0.02]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[0.15, 0.02, 0.02]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      </group>
    </Float>
  )
}

const AIIcon = ({ isHovered }: { isHovered: boolean }) => {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * (isHovered ? 1.5 : 0.3)
    }
    
    if (coreRef.current) {
      const material = coreRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.8 + Math.sin(state.clock.elapsedTime * 3) * 0.2
      coreRef.current.scale.setScalar(isHovered ? 1.3 : 1)
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <group ref={groupRef}>
        {/* AI Core */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>
        
        {/* Neural connections */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const x = Math.cos(angle) * 0.3
          const y = Math.sin(angle) * 0.3
          
          return (
            <group key={i} rotation={[0, 0, angle]}>
              <mesh position={[0.25, 0, 0]}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
              </mesh>
              <mesh position={[0.125, 0, 0]}>
                <boxGeometry args={[0.15, 0.01, 0.01]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
              </mesh>
            </group>
          )
        })}
      </group>
    </Float>
  )
}

const MobileIcon = ({ isHovered }: { isHovered: boolean }) => {
  const phoneRef = useRef<THREE.Group>(null)
  const screenRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (phoneRef.current) {
      phoneRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1
      phoneRef.current.scale.setScalar(isHovered ? 1.1 : 1)
    }
    
    if (screenRef.current) {
      const material = screenRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 4) * 0.2
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.1} floatIntensity={0.4}>
      <group ref={phoneRef}>
        {/* Phone body */}
        <mesh>
          <boxGeometry args={[0.25, 0.4, 0.05]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        
        {/* Screen */}
        <mesh ref={screenRef} position={[0, 0, 0.026]}>
          <boxGeometry args={[0.2, 0.3, 0.01]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
        </mesh>
        
        {/* Home button */}
        <mesh position={[0, -0.25, 0.026]}>
          <cylinderGeometry args={[0.02, 0.02, 0.01, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        
        {/* App icons */}
        {Array.from({ length: 6 }, (_, i) => {
          const row = Math.floor(i / 3)
          const col = i % 3
          const x = (col - 1) * 0.06
          const y = (row - 0.5) * 0.08
          
          return (
            <mesh key={i} position={[x, y, 0.032]}>
              <boxGeometry args={[0.03, 0.03, 0.005]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
            </mesh>
          )
        })}
      </group>
    </Float>
  )
}

const SystemIcon = ({ isHovered }: { isHovered: boolean }) => {
  const groupRef = useRef<THREE.Group>(null)
  const lightsRef = useRef<THREE.Mesh[]>([])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * (isHovered ? 1 : 0.2)
      groupRef.current.scale.setScalar(isHovered ? 1.15 : 1)
    }

    // Animate status lights
    lightsRef.current.forEach((light, i) => {
      if (light?.material) {
        const material = light.material as THREE.MeshBasicMaterial
        material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 5 + i) * 0.3
      }
    })
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={groupRef}>
        {/* Server rack */}
        <mesh>
          <boxGeometry args={[0.4, 0.3, 0.15]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        {/* Server units */}
        {Array.from({ length: 3 }, (_, i) => (
          <mesh key={i} position={[0, 0.08 - i * 0.08, 0.076]}>
            <boxGeometry args={[0.35, 0.06, 0.01]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
          </mesh>
        ))}

        {/* Status lights */}
        {Array.from({ length: 6 }, (_, i) => {
          const row = Math.floor(i / 2)
          const col = i % 2
          const x = (col - 0.5) * 0.1
          const y = 0.08 - row * 0.08

          return (
            <mesh
              key={i}
              position={[x, y, 0.082]}
              ref={(el) => {
                if (el) lightsRef.current[i] = el
              }}
            >
              <sphereGeometry args={[0.01, 8, 8]} />
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.5}
              />
            </mesh>
          )
        })}

        {/* Connection cables */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
        </mesh>
      </group>
    </Float>
  )
}

const AnimatedIcon3D = ({ type, isHovered }: AnimatedIconProps) => {
  switch (type) {
    case 'code':
      return <CodeIcon isHovered={isHovered} />
    case 'ai':
      return <AIIcon isHovered={isHovered} />
    case 'mobile':
      return <MobileIcon isHovered={isHovered} />
    case 'system':
      return <SystemIcon isHovered={isHovered} />
    default:
      return null
  }
}

export default AnimatedIcon3D
