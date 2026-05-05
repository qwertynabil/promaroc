'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, ContactShadows, PresentationControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function AbstractPremiumBuilding() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[2, 3.5, 2]} />
          <meshStandardMaterial color="#18181b" roughness={0.1} metalness={0.8} envMapIntensity={2} />
        </mesh>

        <mesh position={[0, 2.5, 0]}>
          <coneGeometry args={[1.8, 1.5, 4]} />
          <meshStandardMaterial
            color="#22c55e"
            roughness={0.2}
            metalness={0.5}
            emissive="#22c55e"
            emissiveIntensity={0.5}
          />
        </mesh>

        <mesh position={[1.5, -0.75, 0.5]} castShadow>
          <boxGeometry args={[1.5, 2, 1.5]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.9}
            opacity={1}
            metalness={0}
            roughness={0}
            ior={1.5}
            thickness={0.5}
          />
        </mesh>
      </Float>
    </group>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col lg:flex-row items-center justify-between pt-20 pb-20 px-4 md:px-12 max-w-[1400px] mx-auto overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 space-y-6 w-full lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0 order-2 lg:order-1">
        <h2 className="text-zinc-400 font-medium tracking-widest uppercase text-sm">Promaroc Pro</h2>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-200 to-zinc-500">
          Manage smarter. <br /> Live better.
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto lg:mx-0 font-medium">
          Smart property management for the modern world. Streamline operations, automate finances, and maximize your returns.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-8">
          <Button className="rounded-full px-8 py-6 text-lg bg-white text-black hover:bg-zinc-200 transition-transform hover:scale-105">
            Start Free Trial
          </Button>
          <Link href="#demo" className="text-zinc-400 hover:text-white transition-colors text-lg font-medium">
            Watch Demo →
          </Link>
        </div>
      </div>

      <div className="relative z-10 w-full lg:w-1/2 h-[50vh] lg:h-[80vh] order-1 lg:order-2 cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [5, 2, 6], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <Environment preset="city" />
          <PresentationControls global snap rotation={[0, -Math.PI / 4, 0]} polar={[-Math.PI / 3, Math.PI / 3]} azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
            <AbstractPremiumBuilding />
          </PresentationControls>
          <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={10} blur={2.5} far={4} />
        </Canvas>
      </div>
    </section>
  )
}
