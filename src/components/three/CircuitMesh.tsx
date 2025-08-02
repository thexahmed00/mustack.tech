'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Line, Float } from '@react-three/drei'
import * as THREE from 'three'

interface CircuitMeshProps {
  mousePosition?: { x: number; y: number }
}

const CircuitMesh = ({ mousePosition = { x: 0, y: 0 } }: CircuitMeshProps) => {
  const groupRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.Group>(null)
  const nodesRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  // Generate circuit nodes with AI-themed positioning
  const nodes = useMemo(() => {
    const nodeArray = []
    const gridSize = 8
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = (i - gridSize / 2) * 3 + (Math.random() - 0.5) * 0.5
        const y = (j - gridSize / 2) * 2 + (Math.random() - 0.5) * 0.5
        const z = (Math.random() - 0.5) * 2
        
        nodeArray.push({
          position: [x, y, z] as [number, number, number],
          connections: [] as number[],
          isAINode: Math.random() > 0.8, // 20% chance to be an AI node
          pulseOffset: Math.random() * Math.PI * 2,
        })
      }
    }

    // Create intelligent connections
    nodeArray.forEach((node, i) => {
      nodeArray.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.position[0] - otherNode.position[0], 2) +
            Math.pow(node.position[1] - otherNode.position[1], 2)
          )
          if (distance < 4 && Math.random() > 0.6) {
            node.connections.push(j)
          }
        }
      })
    })

    return nodeArray
  }, [])

  // Generate connection lines
  const lines = useMemo(() => {
    const lineArray: { 
      start: [number, number, number]
      end: [number, number, number]
      isActive: boolean
    }[] = []
    
    nodes.forEach((node, i) => {
      node.connections.forEach((connectionIndex) => {
        if (connectionIndex < nodes.length) {
          lineArray.push({
            start: node.position,
            end: nodes[connectionIndex].position,
            isActive: node.isAINode || nodes[connectionIndex].isAINode,
          })
        }
      })
    })
    return lineArray
  }, [nodes])

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
      
      // Mouse parallax effect
      const mouseX = (mousePosition.x / window.innerWidth) * 2 - 1
      const mouseY = -(mousePosition.y / window.innerHeight) * 2 + 1
      
      groupRef.current.rotation.x = mouseY * 0.1
      groupRef.current.rotation.z = mouseX * 0.05
      groupRef.current.position.x = mouseX * 0.5
      groupRef.current.position.y = mouseY * 0.3
    }

    // Animate connection lines
    if (linesRef.current) {
      linesRef.current.children.forEach((line, i) => {
        const material = (line as THREE.Line).material as THREE.LineBasicMaterial
        if (material) {
          const lineData = lines[i]
          if (lineData?.isActive) {
            // Active AI connections pulse brighter
            material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3 + i * 0.5) * 0.2
          } else {
            // Regular connections have subtle pulse
            material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 1.5 + i * 0.3) * 0.05
          }
        }
      })
    }

    // Animate AI nodes
    if (nodesRef.current) {
      nodesRef.current.children.forEach((nodeGroup, i) => {
        const node = nodes[i]
        if (node?.isAINode) {
          const mesh = (nodeGroup as THREE.Group).children[0] as THREE.Mesh
          if (mesh?.material) {
            const material = mesh.material as THREE.MeshBasicMaterial
            material.opacity = 0.8 + Math.sin(state.clock.elapsedTime * 2 + node.pulseOffset) * 0.3
          }
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <group ref={linesRef}>
        {lines.map((line, i) => (
          <Line
            key={i}
            points={[line.start, line.end]}
            color={line.isActive ? "#ffffff" : "#666666"}
            transparent
            opacity={line.isActive ? 0.4 : 0.1}
            lineWidth={line.isActive ? 1 : 0.5}
          />
        ))}
      </group>

      {/* Circuit nodes */}
      <group ref={nodesRef}>
        {nodes.map((node, i) => (
          <Float
            key={i}
            speed={node.isAINode ? 2 : 1}
            rotationIntensity={node.isAINode ? 0.3 : 0.1}
            floatIntensity={node.isAINode ? 0.8 : 0.3}
          >
            <group position={node.position}>
              {node.isAINode ? (
                // AI nodes are larger and more prominent
                <>
                  <mesh>
                    <sphereGeometry args={[0.08, 12, 12]} />
                    <meshBasicMaterial 
                      color="#ffffff" 
                      transparent 
                      opacity={0.9}
                    />
                  </mesh>
                  {/* AI node glow ring */}
                  <mesh>
                    <ringGeometry args={[0.1, 0.15, 16]} />
                    <meshBasicMaterial 
                      color="#ffffff" 
                      transparent 
                      opacity={0.3}
                      side={THREE.DoubleSide}
                    />
                  </mesh>
                </>
              ) : (
                // Regular circuit nodes
                <mesh>
                  <boxGeometry args={[0.04, 0.04, 0.04]} />
                  <meshBasicMaterial 
                    color="#ffffff" 
                    transparent 
                    opacity={0.6}
                  />
                </mesh>
              )}
            </group>
          </Float>
        ))}
      </group>
    </group>
  )
}

export default CircuitMesh
