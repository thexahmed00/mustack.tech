'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Line } from '@react-three/drei'
import * as THREE from 'three'

const SciFiBrain = () => {
  const brainRef = useRef<THREE.Group>(null)
  const neuronsRef = useRef<THREE.Group>(null)
  const connectionsRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)

  // Generate brain structure with neurons and connections
  const brainStructure = useMemo(() => {
    const neurons = []
    const connections = []
    const brainRegions = [
      // Frontal lobe (front)
      { center: [0.8, 0.3, 0], radius: 0.6, density: 15 },
      // Parietal lobe (top)
      { center: [0, 0.8, 0], radius: 0.5, density: 12 },
      // Temporal lobe (sides)
      { center: [-0.7, 0, 0.4], radius: 0.4, density: 10 },
      { center: [0.7, 0, 0.4], radius: 0.4, density: 10 },
      // Occipital lobe (back)
      { center: [-0.8, 0.2, 0], radius: 0.5, density: 12 },
      // Cerebellum (bottom back)
      { center: [-0.6, -0.5, 0], radius: 0.3, density: 8 },
    ]

    // Generate neurons for each brain region
    brainRegions.forEach((region, regionIndex) => {
      for (let i = 0; i < region.density; i++) {
        // Generate points within brain-like shape
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI
        const r = Math.random() * region.radius
        
        const x = region.center[0] + r * Math.sin(phi) * Math.cos(theta)
        const y = region.center[1] + r * Math.cos(phi)
        const z = region.center[2] + r * Math.sin(phi) * Math.sin(theta)
        
        neurons.push({
          position: [x, y, z] as [number, number, number],
          region: regionIndex,
          activity: Math.random(),
          pulseOffset: Math.random() * Math.PI * 2,
          size: 0.02 + Math.random() * 0.03,
        })
      }
    })

    // Create neural connections
    neurons.forEach((neuron, i) => {
      const connectionCount = Math.floor(Math.random() * 4) + 2
      for (let j = 0; j < connectionCount; j++) {
        const targetIndex = Math.floor(Math.random() * neurons.length)
        if (targetIndex !== i) {
          const distance = Math.sqrt(
            Math.pow(neuron.position[0] - neurons[targetIndex].position[0], 2) +
            Math.pow(neuron.position[1] - neurons[targetIndex].position[1], 2) +
            Math.pow(neuron.position[2] - neurons[targetIndex].position[2], 2)
          )
          
          if (distance < 0.8) {
            connections.push({
              start: neuron.position,
              end: neurons[targetIndex].position,
              strength: Math.random(),
              active: Math.random() > 0.7,
            })
          }
        }
      }
    })

    return { neurons, connections }
  }, [])

  useFrame((state) => {
    if (brainRef.current) {
      // Gentle rotation
      brainRef.current.rotation.y = state.clock.elapsedTime * 0.2
      brainRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }

    // Animate core pulsing
    if (coreRef.current) {
      const material = coreRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2
      coreRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1)
    }

    // Animate neurons
    if (neuronsRef.current) {
      neuronsRef.current.children.forEach((neuronMesh, i) => {
        const neuron = brainStructure.neurons[i]
        if (neuron && neuronMesh) {
          const mesh = neuronMesh as THREE.Mesh
          const material = mesh.material as THREE.MeshBasicMaterial
          
          // Pulsing activity
          const activity = 0.4 + Math.sin(state.clock.elapsedTime * 3 + neuron.pulseOffset) * 0.4
          material.opacity = activity * neuron.activity
          
          // Scale based on activity
          mesh.scale.setScalar(neuron.size * (1 + activity * 0.5))
        }
      })
    }

    // Animate connections
    if (connectionsRef.current) {
      connectionsRef.current.children.forEach((connectionGroup, i) => {
        const connection = brainStructure.connections[i]
        if (connection && connectionGroup) {
          const line = connectionGroup.children[0] as THREE.Line
          if (line?.material) {
            const material = line.material as THREE.LineBasicMaterial
            if (connection.active) {
              material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 4 + i * 0.5) * 0.2
            } else {
              material.opacity = 0.05 + Math.sin(state.clock.elapsedTime * 1.5 + i * 0.3) * 0.05
            }
          }
        }
      })
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={brainRef}>
        {/* Brain Core - Central processing unit */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.4}
            wireframe={false}
          />
        </mesh>

        {/* Brain Stem */}
        <mesh position={[0, -0.8, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 0.4, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>

        {/* Neural Network - Neurons */}
        <group ref={neuronsRef}>
          {brainStructure.neurons.map((neuron, i) => (
            <mesh key={i} position={neuron.position}>
              <sphereGeometry args={[neuron.size, 8, 8]} />
              <meshBasicMaterial 
                color="#ffffff" 
                transparent 
                opacity={0.7}
              />
            </mesh>
          ))}
        </group>

        {/* Neural Connections */}
        <group ref={connectionsRef}>
          {brainStructure.connections.map((connection, i) => (
            <group key={i}>
              <Line
                points={[connection.start, connection.end]}
                color="#ffffff"
                transparent
                opacity={connection.active ? 0.4 : 0.1}
                lineWidth={connection.active ? 1 : 0.5}
              />
            </group>
          ))}
        </group>

        {/* Brain Hemispheres Outline */}
        <group>
          {/* Left Hemisphere */}
          <mesh position={[-0.3, 0.1, 0]}>
            <sphereGeometry args={[0.7, 16, 16, 0, Math.PI]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.1}
              wireframe={true}
            />
          </mesh>
          
          {/* Right Hemisphere */}
          <mesh position={[0.3, 0.1, 0]} rotation={[0, Math.PI, 0]}>
            <sphereGeometry args={[0.7, 16, 16, 0, Math.PI]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.1}
              wireframe={true}
            />
          </mesh>
        </group>

        {/* Synaptic Activity Particles */}
        <group>
          {Array.from({ length: 20 }, (_, i) => {
            const angle = (i / 20) * Math.PI * 2
            const radius = 1.2 + Math.sin(i) * 0.3
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle * 0.7) * 0.5
            const z = Math.sin(angle) * radius * 0.5
            
            return (
              <Float key={i} speed={2 + Math.random()} rotationIntensity={0.2} floatIntensity={0.8}>
                <mesh position={[x, y, z]}>
                  <sphereGeometry args={[0.01, 6, 6]} />
                  <meshBasicMaterial 
                    color="#ffffff" 
                    transparent 
                    opacity={0.6}
                  />
                </mesh>
              </Float>
            )
          })}
        </group>

        {/* Data Flow Rings */}
        {Array.from({ length: 3 }, (_, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, i * Math.PI / 3]}>
            <ringGeometry args={[0.8 + i * 0.2, 0.85 + i * 0.2, 32]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

export default SciFiBrain
