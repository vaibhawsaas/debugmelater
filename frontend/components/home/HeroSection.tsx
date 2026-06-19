'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import { Compass, Code2, ShieldCheck, Layers, Download } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    },
  };

  const floatingVariants: Variants = {
    float: (custom: number) => ({
      y: [0, -15, 0],
      transition: { duration: 4 + custom, repeat: Infinity, ease: 'easeInOut' as const, delay: custom * 0.5 }
    })
  } as Variants;

  return (
    <section className="hero" id="hero" aria-labelledby="hero-heading" style={{ overflow: 'hidden', padding: '120px 0 80px', position: 'relative', background: 'var(--bg-primary)' }}>

      {/* Ocean Blue Ribbon Wave Flow */}
      <motion.div
        animate={{ x: ['0%', '-25%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', top: 0, left: 0, right: '-100%', bottom: 0,
          zIndex: 0, pointerEvents: 'none', opacity: 1,
          display: 'flex', alignItems: 'flex-start'
        }}
      >
        <svg width="100%" height="400px" viewBox="0 0 2880 400" preserveAspectRatio="none">
          {/* First Generative Mesh Ribbon */}
          {Array.from({ length: 30 }).map((_, i) => (
            <path 
              key={`mesh1-${i}`} 
              fill="none" 
              stroke={`rgba(14, 165, 233, ${0.1 + (i * 0.01)})`} 
              strokeWidth={1} 
              d={`M0,${180 + i * 3} C240,${50 + i * 1},480,${350 - i * 2},720,${180 + i * 3} C960,${50 + i * 1},1200,${350 - i * 2},1440,${180 + i * 3} C1680,${50 + i * 1},1920,${350 - i * 2},2160,${180 + i * 3} C2400,${50 + i * 1},2640,${350 - i * 2},2880,${180 + i * 3}`} 
            />
          ))}
          {/* Second Generative Mesh Ribbon */}
          {Array.from({ length: 30 }).map((_, i) => (
            <path 
              key={`mesh2-${i}`} 
              fill="none" 
              stroke={`rgba(59, 130, 246, ${0.15 + (i * 0.01)})`} 
              strokeWidth={1.2} 
              d={`M0,${220 - i * 3} C240,${380 - i * 3},480,${40 + i * 2},720,${220 - i * 3} C960,${380 - i * 3},1200,${40 + i * 2},1440,${220 - i * 3} C1680,${380 - i * 3},1920,${40 + i * 2},2160,${220 - i * 3} C2400,${380 - i * 3},2640,${40 + i * 2},2880,${220 - i * 3}`} 
            />
          ))}
          {/* Solid Translucent Overlays for Silk Shading */}
          <path fill="rgba(37, 99, 235, 0.1)" d="M0,180 C240,50,480,350,720,180 C960,50,1200,350,1440,180 C1680,50,1920,350,2160,180 C2400,50,2640,350,2880,180 L2880,270 C2640,400,2400,100,2160,270 C1920,400,1680,100,1440,270 C1200,400,960,100,720,270 C480,400,240,100,0,270 Z" />
          <path fill="rgba(14, 165, 233, 0.08)" d="M0,220 C240,380,480,40,720,220 C960,380,1200,40,1440,220 C1680,380,1920,40,2160,220 C2400,380,2640,40,2880,220 L2880,130 C2640,300,2400,80,2160,130 C1920,300,1680,80,1440,130 C1200,300,960,80,720,130 C480,300,240,80,0,130 Z" />
        </svg>
      </motion.div>

      {/* Subtle Dotted Pattern Background */}
      <motion.div 
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(#000000 2px, transparent 2px)',
          backgroundSize: '32px 32px',
          zIndex: 0,
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
          pointerEvents: 'none'
      }} />

      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 2 }}>

        {/* Centered Typography */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}
        >
          {/* Heading */}
          <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.1, marginBottom: '16px', color: '#0F172A', fontWeight: 700, letterSpacing: '-0.03em' }} id="hero-heading">
            Build Faster & Debug Less <br />
            Premium Source Code for Developers
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} style={{ fontSize: '18px', color: '#475569', lineHeight: 1.6, maxWidth: '700px', fontWeight: 400 }}>
            Stop reinventing the wheel. Download production-ready React templates, full-stack Next.js projects, and beautifully crafted UI components to scale your ideas instantly.
          </motion.p>
        </motion.div>

        {/* Central Graphic with Floating Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ position: 'relative', width: '100%', maxWidth: '800px', height: '480px', margin: '0 auto 64px' }}
        >
          {/* Main Dashboard Mockup */}
          <div style={{ position: 'absolute', inset: 0, background: '#FFFFFF', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)', border: '1px solid rgba(15, 23, 42, 0.05)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '48px', borderBottom: '1px solid rgba(15,23,42,0.05)', display: 'flex', alignItems: 'center', padding: '0 24px', background: '#F8FAFC' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#E2E8F0' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#E2E8F0' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#E2E8F0' }} />
              </div>
              <div style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: 600, color: '#64748B', fontFamily: 'monospace' }}>DebugMeLater / SaaS-Template</div>
            </div>
            <div style={{ flex: 1, position: 'relative', background: '#F8FAFC' }}>
              <Image src="/hero.png" alt="Hero Template Preview" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>

          {/* Floating Card 1: Components */}
          <motion.div custom={0} variants={floatingVariants} animate="float" style={{ position: 'absolute', top: '15%', left: '-10%', background: '#FFF', padding: '16px 24px', borderRadius: '16px', boxShadow: '0 20px 40px rgba(15,23,42,0.1)', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid rgba(15,23,42,0.03)', transform: 'rotate(-4deg)' }}>
            <div style={{ background: '#E0F2FE', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284C7' }}>
              <Code2 size={20} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#0F172A' }}>150+ Ready</div>
              <div style={{ fontSize: '13px', color: '#64748B' }}>React Components</div>
            </div>
          </motion.div>

          {/* Floating Card 2: Quality */}
          <motion.div custom={1} variants={floatingVariants} animate="float" style={{ position: 'absolute', top: '5%', right: '-8%', background: '#FFF', padding: '16px 24px', borderRadius: '16px', boxShadow: '0 20px 40px rgba(15,23,42,0.1)', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid rgba(15,23,42,0.03)', transform: 'rotate(2deg)' }}>
            <div style={{ background: '#DCFCE7', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A' }}>
              <ShieldCheck size={20} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#0F172A' }}>Zero Bugs</div>
              <div style={{ fontSize: '13px', color: '#64748B' }}>Production Ready</div>
            </div>
          </motion.div>

          {/* Floating Card 3: Stack */}
          <motion.div custom={2} variants={floatingVariants} animate="float" style={{ position: 'absolute', bottom: '15%', left: '-15%', background: '#FFF', padding: '16px 24px', borderRadius: '16px', boxShadow: '0 20px 40px rgba(15,23,42,0.1)', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid rgba(15,23,42,0.03)', transform: 'rotate(3deg)', zIndex: 10 }}>
            <div style={{ background: '#F3E8FF', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333EA' }}>
              <Layers size={20} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#0F172A' }}>Full-Stack</div>
              <div style={{ fontSize: '13px', color: '#64748B' }}>Next.js & Node</div>
            </div>
          </motion.div>

          {/* Floating Card 4: Access */}
          <motion.div custom={3} variants={floatingVariants} animate="float" style={{ position: 'absolute', bottom: '5%', right: '-12%', background: '#FFF', padding: '20px 24px', borderRadius: '16px', boxShadow: '0 20px 40px rgba(15,23,42,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', border: '1px solid rgba(15,23,42,0.03)', transform: 'rotate(-2deg)' }}>
            <div style={{ background: '#FEF3C7', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
              <Download size={20} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#0F172A' }}>Instant Access</div>
              <div style={{ fontSize: '13px', color: '#64748B' }}>Download & Ship</div>
            </div>
          </motion.div>

        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Link href="/projects" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#0F172A', color: '#fff', padding: '16px 32px', borderRadius: '100px', fontSize: '16px', fontWeight: 600, transition: 'all 0.2s', boxShadow: '0 10px 25px rgba(15,23,42,0.2)' }}>
            <Compass size={18} /> Explore Projects
          </Link>
          <Link href="/categories" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#FFF', color: '#0F172A', padding: '16px 32px', borderRadius: '100px', fontSize: '16px', fontWeight: 600, border: '1px solid #E2E8F0', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(15,23,42,0.05)' }}>
            <Code2 size={18} /> Browse Components
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
