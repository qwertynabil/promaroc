'use client';

import React, { useRef, useState, MouseEvent } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

// ==========================================
// 1. 3D HERO MODEL COMPONENT
// ==========================================
function AbstractPremiumBuilding() {
  const group = useRef<THREE.Group>(null);

  // Subtle continuous rotation
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Main Dark Tower */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[2, 3.5, 2]} />
          <meshStandardMaterial 
            color="#18181b" // zinc-900
            roughness={0.1} 
            metalness={0.8} 
            envMapIntensity={2}
          />
        </mesh>
        
        {/* Glowing Top Element */}
        <mesh position={[0, 2.5, 0]}>
          <coneGeometry args={[1.8, 1.5, 4]} />
          <meshStandardMaterial 
            color="#22c55e" // green-500
            roughness={0.2} 
            metalness={0.5}
            emissive="#22c55e"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Attached Glass Block */}
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
  );
}

// ==========================================
// 2. 3D INTERACTIVE TILT CARD
// ==========================================
function TiltCard({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      className={`transition-all duration-200 ease-out will-change-transform ${className}`}
      style={{ transform, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full h-full" style={{ transform: 'translateZ(30px)' }}>
        {children}
      </div>
    </div>
  );
}

// ==========================================
// 3. MAIN PAGE COMPONENT
// ==========================================
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans overflow-x-hidden">
      <Header />
      
      <main className="pt-16">
        
        {/* 1. HERO SECTION (Strict 2-Column Split) */}
        <section className="relative min-h-[90vh] grid grid-cols-1 lg:grid-cols-2 items-center max-w-[1600px] mx-auto overflow-hidden">
          
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-900/20 rounded-full blur-[120px] pointer-events-none" />

          {/* Column 1: Text Content */}
          <div className="relative z-10 space-y-8 p-8 md:p-16 lg:pl-24 order-2 lg:order-1 flex flex-col justify-center h-full">
            <div>
              <h2 className="text-zinc-400 font-medium tracking-widest uppercase text-sm mb-4">
                Promaroc Pro
              </h2>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-200 to-zinc-500 leading-[1.1]">
                Manage smarter. <br /> Live better.
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-lg font-medium leading-relaxed">
              Smart property management for the modern world. Streamline operations, automate finances, and maximize your returns.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
              <Button className="rounded-full px-8 py-6 text-lg bg-white text-black hover:bg-zinc-200 transition-transform hover:scale-105 w-full sm:w-auto">
                Start Free Trial
              </Button>
              <Link href="#demo" className="text-zinc-400 hover:text-white transition-colors text-lg font-medium">
                Watch Demo &rarr;
              </Link>
            </div>
          </div>

          {/* Column 2: 3D Canvas */}
          <div className="relative z-10 w-full h-[50vh] lg:h-full min-h-[600px] order-1 lg:order-2 cursor-grab active:cursor-grabbing border-l border-white/5 bg-zinc-950/30 backdrop-blur-sm">
            <Canvas camera={{ position: [5, 2, 6], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} />
              <Environment preset="city" />
              
              <PresentationControls 
                global 
                snap={true}
                rotation={[0, -Math.PI / 4, 0]} 
                polar={[-Math.PI / 3, Math.PI / 3]} 
                azimuth={[-Math.PI / 1.4, Math.PI / 2]}
              >
                <AbstractPremiumBuilding />
              </PresentationControls>

              <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={10} blur={2.5} far={4} />
            </Canvas>
          </div>
        </section>

        {/* 2. STATS SECTION */}
        <section className="py-24 px-8 border-y border-zinc-900 bg-zinc-950/50 relative z-20">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="group">
              <div className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-2 transition-transform group-hover:scale-110">10K+</div>
              <div className="text-xs sm:text-sm font-medium text-zinc-500 uppercase tracking-wider">Properties</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-2 transition-transform group-hover:scale-110">50K+</div>
              <div className="text-xs sm:text-sm font-medium text-zinc-500 uppercase tracking-wider">Tenants</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-2 transition-transform group-hover:scale-110">99.9%</div>
              <div className="text-xs sm:text-sm font-medium text-zinc-500 uppercase tracking-wider">Uptime</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-2 transition-transform group-hover:scale-110">24/7</div>
              <div className="text-xs sm:text-sm font-medium text-zinc-500 uppercase tracking-wider">Support</div>
            </div>
          </div>
        </section>

        {/* 3. STRICT 2-COLUMN BENTO BOX FEATURES */}
        <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto space-y-12 relative z-20">
          <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tight">
              Powerful Features. <br /> Two sides of the coin.
            </h2>
            <p className="text-xl text-zinc-400">
              Hover over the cards below to see the interactive 3D perspective in action.
            </p>
          </div>

          {/* Strict 2 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 perspective-[2000px]">
            
            {/* Box 1 */}
            <TiltCard className="bg-gradient-to-br from-zinc-900 to-black rounded-[2.5rem] p-10 md:p-14 border border-zinc-800 relative overflow-hidden group">
              <div className="relative z-10 flex flex-col justify-between h-full min-h-[350px]">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 backdrop-blur-md">
                     <span className="text-2xl text-white">🏢</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
                    Tenant Management.
                  </h3>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Complete lifecycle management from screening to move-out. Automate your lease agreements, applications, and maintenance requests seamlessly.
                  </p>
                </div>
              </div>
              <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
            </TiltCard>

            {/* Box 2 */}
            <TiltCard className="bg-gradient-to-bl from-zinc-900 to-black rounded-[2.5rem] p-10 md:p-14 border border-zinc-800 relative overflow-hidden group">
              <div className="relative z-10 flex flex-col justify-between h-full min-h-[350px]">
                 <div>
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 backdrop-blur-md">
                     <span className="text-2xl text-white">📈</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                    Financial Tracking.
                  </h3>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Automated rent collection, expense tracking, and comprehensive reporting. Keep your cash flow transparent and your ledgers perfectly balanced.
                  </p>
                </div>
              </div>
              <div className="absolute -left-20 -top-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
            </TiltCard>

            {/* Box 3 */}
            <TiltCard className="bg-gradient-to-tr from-zinc-900 to-black rounded-[2.5rem] p-10 md:p-14 border border-zinc-800 relative overflow-hidden group">
              <div className="relative z-10 flex flex-col justify-between h-full min-h-[350px]">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 backdrop-blur-md">
                     <span className="text-2xl text-white">📊</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
                    Property Analytics.
                  </h3>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Data-driven insights with occupancy rates, performance analytics, and market trend analysis directly on your dashboard.
                  </p>
                </div>
              </div>
              <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
            </TiltCard>

            {/* Box 4 */}
            <TiltCard className="bg-gradient-to-tl from-zinc-900 to-black rounded-[2.5rem] p-10 md:p-14 border border-zinc-800 relative overflow-hidden group">
              <div className="relative z-10 flex flex-col justify-between h-full min-h-[350px]">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 backdrop-blur-md">
                     <span className="text-2xl text-white">🔧</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                    Maintenance Coordination.
                  </h3>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Streamlined workflows with work order management, contractor coordination, and emergency response tracking all in one centralized hub.
                  </p>
                </div>
              </div>
              <div className="absolute -right-20 -top-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
            </TiltCard>

          </div>
        </section>

        {/* 4. BOTTOM CTA */}
        <section className="py-32 px-4 text-center relative z-20">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white">
              Ready to transform?
            </h2>
            <p className="text-xl text-zinc-400">
              Join thousands of property managers who have streamlined their operations with Promaroc.
            </p>
            <div className="pt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button className="w-full sm:w-auto rounded-full px-10 py-6 text-xl bg-green-500 text-black hover:bg-green-400 transition-transform hover:scale-105">
                Start your 14-day free trial
              </Button>
            </div>
            <p className="text-zinc-500 text-sm">No credit card required. Cancel anytime.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}