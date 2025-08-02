'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface WireframeGlobeProps {
  mousePosition?: { x: number; y: number }
  radius?: number
  rotationSpeed?: number
  opacity?: number
  showConnections?: boolean
  position?: [number, number, number]
}

const WireframeGlobe = ({ 
  mousePosition = { x: 0, y: 0 },
  radius = 1.4,
  rotationSpeed = 0.002,
  opacity = 0.4,
  showConnections = true,
  position = [2, 0, 0]
}: WireframeGlobeProps) => {
  const globeRef = useRef<THREE.Group>(null)
  const wireframeRef = useRef<THREE.LineSegments>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const connectionsRef = useRef<THREE.Group>(null)
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 })

  // Handle responsive positioning
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Generate globe wireframe geometry
  const { wireframeGeometry, pointsGeometry, connectionLines } = useMemo(() => {
    // Create sphere geometry for wireframe
    const sphereGeometry = new THREE.SphereGeometry(radius, 32, 16)
    const wireframeGeo = new THREE.WireframeGeometry(sphereGeometry)

    // Create points for dot-grid style
    const pointsGeo = new THREE.BufferGeometry()
    const pointsPositions = []
    const pointsCount = 800

    for (let i = 0; i < pointsCount; i++) {
      // Distribute points evenly on sphere surface
      const phi = Math.acos(-1 + (2 * i) / pointsCount)
      const theta = Math.sqrt(pointsCount * Math.PI) * phi
      
      const x = radius * Math.cos(theta) * Math.sin(phi)
      const y = radius * Math.cos(phi)
      const z = radius * Math.sin(theta) * Math.sin(phi)
      
      pointsPositions.push(x, y, z)
    }

    pointsGeo.setAttribute('position', new THREE.Float32BufferAttribute(pointsPositions, 3))

    // Generate network connection lines
    const connections = []
    const connectionCount = 15
    
    for (let i = 0; i < connectionCount; i++) {
      const startPhi = Math.random() * Math.PI
      const startTheta = Math.random() * Math.PI * 2
      const endPhi = Math.random() * Math.PI
      const endTheta = Math.random() * Math.PI * 2
      
      const start = new THREE.Vector3(
        radius * Math.sin(startPhi) * Math.cos(startTheta),
        radius * Math.cos(startPhi),
        radius * Math.sin(startPhi) * Math.sin(startTheta)
      )
      
      const end = new THREE.Vector3(
        radius * Math.sin(endPhi) * Math.cos(endTheta),
        radius * Math.cos(endPhi),
        radius * Math.sin(endPhi) * Math.sin(endTheta)
      )
      
      // Create curved connection using quadratic bezier
      const mid = start.clone().add(end).multiplyScalar(0.5)
      mid.normalize().multiplyScalar(radius * 1.2) // Curve outward
      
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
      const points = curve.getPoints(20)
      
      connections.push({
        points,
        opacity: Math.random() * 0.5 + 0.2,
        pulseOffset: Math.random() * Math.PI * 2,
        speed: Math.random() * 2 + 1
      })
    }

    return { 
      wireframeGeometry: wireframeGeo, 
      pointsGeometry: pointsGeo, 
      connectionLines: connections 
    }
  }, [radius])

  // Responsive positioning based on screen size
  const getResponsivePosition = (): [number, number, number] => {
    if (windowSize.width < 768) {
      // Mobile: center the globe
      return [0, 0, 0]
    } else if (windowSize.width < 1024) {
      // Tablet: slight offset
      return [1, 0, 0]
    } else {
      // Desktop: offset to right
      return position
    }
  }

  useFrame((state) => {
    if (globeRef.current) {
      // Auto-rotation on Y-axis
      globeRef.current.rotation.y += rotationSpeed

      // Keep fixed position without mouse parallax
      const fixedPosition = getResponsivePosition()
      globeRef.current.position.x = fixedPosition[0]
      globeRef.current.position.y = fixedPosition[1]
      globeRef.current.position.z = fixedPosition[2]
    }

    // Animate connection lines
    if (connectionsRef.current && showConnections) {
      connectionsRef.current.children.forEach((line, i) => {
        const connection = connectionLines[i]
        if (connection && line) {
          const lineMesh = line as THREE.Line
          const material = lineMesh.material as THREE.LineBasicMaterial
          
          // Pulsing opacity effect
          const pulse = Math.sin(state.clock.elapsedTime * connection.speed + connection.pulseOffset)
          material.opacity = connection.opacity * (0.5 + pulse * 0.3)
        }
      })
    }

    // Subtle point animation
    if (pointsRef.current) {
      const material = pointsRef.current.material as THREE.PointsMaterial
      material.opacity = opacity * (0.8 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2)
    }
  })

  return (
    <group 
      ref={globeRef} 
      position={getResponsivePosition()}
      scale={windowSize.width < 768 ? 0.7 : 1}
    >
      {/* Wireframe Globe */}
      <lineSegments ref={wireframeRef} geometry={wireframeGeometry}>
        <lineBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={opacity * 0.6}
          linewidth={1}
        />
      </lineSegments>

      {/* Point Cloud */}
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial
          color="#ffffff"
          size={0.02}
          transparent
          opacity={opacity}
          sizeAttenuation={true}
        />
      </points>

      {/* Network Connections */}
      {showConnections && (
        <group ref={connectionsRef}>
          {connectionLines.map((connection, i) => (
            <line key={i}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={connection.points.length}
                  array={new Float32Array(
                    connection.points.flatMap(point => [point.x, point.y, point.z])
                  )}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color="#ffffff"
                transparent
                opacity={connection.opacity}
                linewidth={1}
              />
            </line>
          ))}
        </group>
      )}

      {/* Subtle ambient glow */}
      <mesh>
        <sphereGeometry args={[radius * 1.05, 32, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

export default WireframeGlobe
