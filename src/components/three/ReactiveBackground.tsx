'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface ReactiveBackgroundProps {
  mousePosition?: { x: number; y: number }
  isTyping?: boolean
  color?: string
}

const ReactiveBackground = ({ 
  mousePosition = { x: 0, y: 0 }, 
  isTyping = false,
  color = '#000000' 
}: ReactiveBackgroundProps) => {
  const pointsRef = useRef<THREE.Points>(null)
  const meshRef = useRef<THREE.Mesh>(null)

  // Generate reactive particle grid
  const { positions, connections } = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    const connections: number[][] = []
    const gridSize = 20
    
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5
    }

    // Create connection patterns
    for (let i = 0; i < 100; i++) {
      const connectionGroup = []
      for (let j = 0; j < 5; j++) {
        connectionGroup.push(Math.floor(Math.random() * 2000))
      }
      connections.push(connectionGroup)
    }

    return { positions, connections }
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      
      // Mouse influence
      const mouseX = (mousePosition.x / window.innerWidth) * 2 - 1
      const mouseY = -(mousePosition.y / window.innerHeight) * 2 + 1
      
      // Typing reaction - particles become more active
      const typingMultiplier = isTyping ? 3 : 1
      
      for (let i = 0; i < positions.length; i += 3) {
        const originalX = positions[i]
        const originalY = positions[i + 1]
        
        // Distance from mouse
        const distanceFromMouse = Math.sqrt(
          Math.pow(originalX - mouseX * 15, 2) + 
          Math.pow(originalY - mouseY * 10, 2)
        )
        
        // Particle movement based on mouse proximity and typing
        if (distanceFromMouse < 5) {
          positions[i] += Math.sin(state.clock.elapsedTime * 2 + i) * 0.02 * typingMultiplier
          positions[i + 1] += Math.cos(state.clock.elapsedTime * 2 + i) * 0.02 * typingMultiplier
        } else {
          // Gentle ambient movement
          positions[i + 1] += Math.sin(state.clock.elapsedTime + i * 0.01) * 0.005
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true
      
      // Overall rotation and movement
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
      pointsRef.current.position.x = mouseX * 0.5
      pointsRef.current.position.y = mouseY * 0.3
    }

    // Reactive mesh overlay
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshBasicMaterial
      
      // Pulse effect when typing
      if (isTyping) {
        material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 8) * 0.05
      } else {
        material.opacity = 0.03 + Math.sin(state.clock.elapsedTime * 2) * 0.02
      }
      
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group>
      {/* Reactive particle field */}
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={isTyping ? 0.6 : 0.3}
        />
      </Points>

      {/* Connection lines that react to typing */}
      {connections.slice(0, isTyping ? 20 : 10).map((connection, i) => (
        <group key={i}>
          {connection.map((pointIndex, j) => {
            if (j === 0 || pointIndex >= 2000) return null
            
            const prevIndex = connection[j - 1]
            if (prevIndex >= 2000) return null
            
            const start = [
              positions[prevIndex * 3],
              positions[prevIndex * 3 + 1],
              positions[prevIndex * 3 + 2]
            ] as [number, number, number]
            
            const end = [
              positions[pointIndex * 3],
              positions[pointIndex * 3 + 1],
              positions[pointIndex * 3 + 2]
            ] as [number, number, number]
            
            return (
              <line key={`${i}-${j}`}>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    count={2}
                    array={new Float32Array([...start, ...end])}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial
                  color={color}
                  transparent
                  opacity={isTyping ? 0.3 : 0.1}
                />
              </line>
            )
          })}
        </group>
      ))}

      {/* Overlay mesh for additional effects */}
      <mesh ref={meshRef} position={[0, 0, -2]}>
        <planeGeometry args={[40, 30]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.03}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

export default ReactiveBackground
