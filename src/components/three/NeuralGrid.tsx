'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line, Float } from '@react-three/drei'
import * as THREE from 'three'

interface NeuralGridProps {
  count?: number
  spread?: number
}

const NeuralGrid = ({ count = 50, spread = 20 }: NeuralGridProps) => {
  const groupRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.Group>(null)

  // Define the node type
  interface NeuralNode {
    position: [number, number, number]
    connections: number[]
  }

  // Generate neural network nodes
  const nodes = useMemo(() => {
    const nodeArray: NeuralNode[] = []
    for (let i = 0; i < count; i++) {
      nodeArray.push({
        position: [
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread * 0.5,
        ] as [number, number, number],
        connections: [] as number[],
      })
    }

    // Create connections between nearby nodes
    nodeArray.forEach((node, i) => {
      nodeArray.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.position[0] - otherNode.position[0], 2) +
            Math.pow(node.position[1] - otherNode.position[1], 2) +
            Math.pow(node.position[2] - otherNode.position[2], 2)
          )
          if (distance < 5 && Math.random() > 0.7) {
            node.connections.push(j)
          }
        }
      })
    })

    return nodeArray
  }, [count, spread])

  // Generate connection lines
  const lines = useMemo(() => {
    const lineArray: { start: [number, number, number]; end: [number, number, number] }[] = []
    nodes.forEach((node) => {
      node.connections.forEach((connectionIndex) => {
        if (connectionIndex < nodes.length) {
          lineArray.push({
            start: node.position,
            end: nodes[connectionIndex].position,
          })
        }
      })
    })
    return lineArray
  }, [nodes])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }

    if (linesRef.current) {
      linesRef.current.children.forEach((line, i) => {
        const material = (line as THREE.Line).material as THREE.LineBasicMaterial
        if (material) {
          material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 2 + i * 0.1) * 0.05
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* Neural nodes */}
      {nodes.map((node, i) => (
        <Float
          key={i}
          speed={1 + Math.random()}
          rotationIntensity={0.2}
          floatIntensity={0.5}
        >
          <mesh position={node.position}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial 
              color="white" 
              transparent 
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}

      {/* Connection lines */}
      <group ref={linesRef}>
        {lines.map((line, i) => (
          <Line
            key={i}
            points={[line.start, line.end]}
            color="white"
            transparent
            opacity={0.1}
            lineWidth={0.5}
          />
        ))}
      </group>
    </group>
  )
}

export default NeuralGrid
