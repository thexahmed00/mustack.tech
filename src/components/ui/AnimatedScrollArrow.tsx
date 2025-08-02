'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion'
import * as THREE from 'three'

const ThreeJSArrow = () => {
  const arrowRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (arrowRef.current) {
      // Floating animation
      arrowRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2
      arrowRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.1
    }

    if (glowRef.current) {
      const material = glowRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2
    }
  })

  return (
    <group ref={arrowRef}>
      {/* Arrow shaft */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.02, 0.4, 0.02]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {/* Arrow head */}
      <mesh position={[0, -0.1, 0]}>
        <coneGeometry args={[0.08, 0.15, 6]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {/* Glow effect */}
      <mesh ref={glowRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.2}
        />
      </mesh>
    </group>
  )
}

const AnimatedScrollArrow = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
      onClick={() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
      }}
    >
      <div className="flex flex-col items-center space-y-2 group">
        {/* Three.js Arrow */}
        <div className="w-16 h-16 relative">
          <canvas className="w-full h-full">
            {/* This would be rendered by the parent Canvas */}
          </canvas>
        </div>
        
        {/* Fallback CSS Arrow for better compatibility */}
        <div className="w-6 h-6 relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <svg 
              className="w-full h-full text-white opacity-60 group-hover:opacity-100 transition-opacity" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </motion.div>
        </div>
        
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity font-display"
        >
          EXPLORE
        </motion.div>
      </div>
    </motion.div>
  )
}

export { ThreeJSArrow }
export default AnimatedScrollArrow
