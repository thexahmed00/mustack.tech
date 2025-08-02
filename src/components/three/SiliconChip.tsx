'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const SiliconChip = () => {
  const chipRef = useRef<THREE.Group>(null)
  const circuitRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (chipRef.current) {
      chipRef.current.rotation.y = state.clock.elapsedTime * 0.3
      chipRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }

    if (circuitRef.current) {
      circuitRef.current.children.forEach((child, i) => {
        const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
        if (material) {
          material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.2
        }
      })
    }
  })

  // Generate circuit pattern
  const circuitLines = []
  for (let i = 0; i < 20; i++) {
    const x = (Math.random() - 0.5) * 2
    const y = (Math.random() - 0.5) * 2
    const z = 0.51
    circuitLines.push({ x, y, z, rotation: Math.random() * Math.PI * 2 })
  }

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={chipRef}>
        {/* Main chip body */}
        <mesh>
          <boxGeometry args={[2, 2, 0.2]} />
          <meshBasicMaterial 
            color="white" 
            transparent 
            opacity={0.9}
            wireframe={false}
          />
        </mesh>

        {/* Chip pins */}
        {Array.from({ length: 16 }, (_, i) => {
          const side = Math.floor(i / 4)
          const position = (i % 4) - 1.5
          const isVertical = side % 2 === 0
          
          return (
            <mesh
              key={i}
              position={
                isVertical 
                  ? [position * 0.4, side === 0 ? -1.2 : 1.2, 0]
                  : [side === 1 ? 1.2 : -1.2, position * 0.4, 0]
              }
            >
              <boxGeometry args={[0.1, 0.3, 0.05]} />
              <meshBasicMaterial color="white" transparent opacity={0.8} />
            </mesh>
          )
        })}

        {/* Circuit patterns */}
        <group ref={circuitRef}>
          {circuitLines.map((line, i) => (
            <group key={i} position={[line.x, line.y, line.z]} rotation={[0, 0, line.rotation]}>
              <mesh>
                <boxGeometry args={[0.4, 0.02, 0.01]} />
                <meshBasicMaterial color="white" transparent opacity={0.4} />
              </mesh>
              <mesh position={[0.2, 0, 0]}>
                <boxGeometry args={[0.02, 0.1, 0.01]} />
                <meshBasicMaterial color="white" transparent opacity={0.4} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Corner connection points */}
        {[[-0.8, -0.8], [0.8, -0.8], [0.8, 0.8], [-0.8, 0.8]].map((pos, i) => (
          <mesh key={i} position={[pos[0], pos[1], 0.11]}>
            <cylinderGeometry args={[0.05, 0.05, 0.02, 8]} />
            <meshBasicMaterial color="white" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

export default SiliconChip
