'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface MustackLogo3DProps {
  mousePosition?: { x: number; y: number }
  rotationSpeed?: number
  opacity?: number
  position?: [number, number, number]
  useWireframe?: boolean
}

const MustackLogo3D = ({ 
  mousePosition = { x: 0, y: 0 },
  rotationSpeed = 0.0025,
  opacity = 0.35,
  position = [-2.7, 0, 0],
  useWireframe = false
}: MustackLogo3DProps) => {
  const logoRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  // Create the circuit S-shape geometry
  const { sShapeGeometry, circuitNodes, connectionLines } = useMemo(() => {
    // Create the main S-curve path
    const sPath = new THREE.CurvePath<THREE.Vector3>()
    
    // Top curve of S
    const topCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0.5, 1, 0),      // Start point (top right)
      new THREE.Vector3(-0.3, 1, 0),     // Control point 1
      new THREE.Vector3(-0.3, 0.5, 0),   // Control point 2
      new THREE.Vector3(0.2, 0.5, 0)     // End point (middle)
    )
    
    // Middle transition
    const middleCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0.2, 0.5, 0),    // Start from middle
      new THREE.Vector3(0.4, 0.3, 0),    // Control point 1
      new THREE.Vector3(-0.4, -0.3, 0),  // Control point 2
      new THREE.Vector3(-0.2, -0.5, 0)   // End point
    )
    
    // Bottom curve of S
    const bottomCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-0.2, -0.5, 0),  // Start from middle
      new THREE.Vector3(0.3, -0.5, 0),   // Control point 1
      new THREE.Vector3(0.3, -1, 0),     // Control point 2
      new THREE.Vector3(-0.5, -1, 0)     // End point (bottom left)
    )
    
    sPath.add(topCurve)
    sPath.add(middleCurve)
    sPath.add(bottomCurve)
    
    // Create tube geometry for the S-shape
    const tubeGeometry = new THREE.TubeGeometry(sPath, 64, 0.08, 8, false)
    
    // Generate circuit nodes along the path
    const nodes = []
    const nodeCount = 12
    for (let i = 0; i < nodeCount; i++) {
      const t = i / (nodeCount - 1)
      const point = sPath.getPoint(t)
      nodes.push({
        position: [point.x, point.y, point.z] as [number, number, number],
        size: 0.03 + Math.random() * 0.02,
        pulseOffset: Math.random() * Math.PI * 2,
        intensity: Math.random() * 0.5 + 0.5
      })
    }
    
    // Create connection lines between nodes
    const connections = []
    for (let i = 0; i < nodes.length - 1; i++) {
      if (Math.random() > 0.3) { // 70% chance of connection
        connections.push({
          start: nodes[i].position,
          end: nodes[i + 1].position,
          opacity: Math.random() * 0.4 + 0.2,
          pulseSpeed: Math.random() * 2 + 1
        })
      }
    }
    
    // Add some cross-connections for circuit complexity
    for (let i = 0; i < 4; i++) {
      const startIdx = Math.floor(Math.random() * nodes.length)
      const endIdx = Math.floor(Math.random() * nodes.length)
      if (startIdx !== endIdx && Math.abs(startIdx - endIdx) > 2) {
        connections.push({
          start: nodes[startIdx].position,
          end: nodes[endIdx].position,
          opacity: Math.random() * 0.3 + 0.1,
          pulseSpeed: Math.random() * 1.5 + 0.5
        })
      }
    }
    
    return { 
      sShapeGeometry: tubeGeometry, 
      circuitNodes: nodes, 
      connectionLines: connections 
    }
  }, [])

  useFrame((state) => {
    if (logoRef.current) {
      // Auto-rotation on Y-axis
      logoRef.current.rotation.y += rotationSpeed

      // Keep fixed position and rotation without mouse parallax
      logoRef.current.position.x = position[0]
      logoRef.current.position.y = position[1]
      logoRef.current.position.z = position[2]
      logoRef.current.rotation.x = 0
      logoRef.current.rotation.z = 0
    }

    // Animate glow effect
    if (glowRef.current) {
      const material = glowRef.current.material as THREE.MeshBasicMaterial
      material.opacity = opacity * 0.3 * (0.7 + Math.sin(state.clock.elapsedTime * 1.5) * 0.3)
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05)
    }
  })

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={logoRef} position={position} scale={1.2}>
        {/* Main S-shape logo */}
        <mesh geometry={sShapeGeometry}>
          {useWireframe ? (
            <meshBasicMaterial 
              color="#ffffff" 
              wireframe 
              transparent 
              opacity={opacity}
            />
          ) : (
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={opacity}
              emissive="#ffffff"
              emissiveIntensity={0.1}
              roughness={0.3}
              metalness={0.7}
            />
          )}
        </mesh>

        {/* Circuit nodes */}
        <group>
          {circuitNodes.map((node, i) => (
            <Float key={i} speed={1 + Math.random()} rotationIntensity={0.2} floatIntensity={0.3}>
              <mesh position={node.position}>
                <sphereGeometry args={[node.size, 8, 8]} />
                <meshBasicMaterial 
                  color="#ffffff" 
                  transparent 
                  opacity={opacity * node.intensity}
                />
              </mesh>
            </Float>
          ))}
        </group>

        {/* Connection lines */}
        <group>
          {connectionLines.map((connection, i) => (
            <line key={i}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    ...connection.start,
                    ...connection.end
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color="#ffffff"
                transparent
                opacity={connection.opacity * opacity}
                linewidth={1}
              />
            </line>
          ))}
        </group>

        {/* Soft glow effect */}
        <mesh ref={glowRef} geometry={sShapeGeometry}>
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={opacity * 0.2}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Additional circuit elements */}
        <group>
          {/* Corner connectors */}
          {[
            [0.5, 1, 0], [-0.5, -1, 0], // Top right, bottom left
            [0.2, 0.5, 0], [-0.2, -0.5, 0] // Middle points
          ].map((pos, i) => (
            <mesh key={i} position={pos as [number, number, number]}>
              <boxGeometry args={[0.06, 0.06, 0.02]} />
              <meshBasicMaterial 
                color="#ffffff" 
                transparent 
                opacity={opacity * 0.8}
              />
            </mesh>
          ))}
        </group>

        {/* Data flow particles */}
        <group>
          {Array.from({ length: 8 }, (_, i) => {
            const t = (i / 8) + (Date.now() * 0.0005) % 1
            const point = new THREE.Vector3()
            // Simulate movement along the S-curve
            const angle = t * Math.PI * 2
            point.x = Math.sin(angle) * 0.6
            point.y = Math.cos(angle * 1.5) * 0.8
            point.z = Math.sin(angle * 0.5) * 0.1
            
            return (
              <Float key={i} speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
                <mesh position={[point.x, point.y, point.z]}>
                  <sphereGeometry args={[0.01, 6, 6]} />
                  <meshBasicMaterial 
                    color="#ffffff" 
                    transparent 
                    opacity={opacity * 0.6}
                  />
                </mesh>
              </Float>
            )
          })}
        </group>
      </group>
    </Float>
  )
}

export default MustackLogo3D
