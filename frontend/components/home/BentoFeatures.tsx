'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { Code2, Zap, Layers, Cpu } from 'lucide-react';

export default function BentoFeatures() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <section className="section" style={{ background: '#0A0C12', padding: '100px 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', background: '#F1F5F9', color: '#0F172A', borderRadius: '100px', fontSize: '15px', fontWeight: 600, marginBottom: '24px', border: '1px solid #E2E8F0' }}>
             Built for Scale
          </div>
          <h2 className="section__title" style={{ fontSize: '48px', marginBottom: '20px', fontWeight: 800, color: '#FFFFFF' }}>
            Everything you need to <span style={{ color: '#0284C7' }}>succeed</span>.
          </h2>
          <p className="section__subtitle" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '18px', color: '#E2E8F0' }}>
            Stop wrestling with messy code. We've handcrafted the most powerful, bug-free, and production-ready components just for you.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="bento-grid-wrap"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto auto', gap: '24px' }}
        >
          
          {/* Large Feature - Spans 2 columns */}
          <motion.div variants={itemVariants} whileHover={{ y: -8, scale: 1.02 }} className="bento-card-large" style={{ gridColumn: 'span 2', background: '#FFFFFF', borderRadius: '24px', padding: '48px', position: 'relative', overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 20px 40px rgba(15,23,42,0.05)', cursor: 'default' }}>
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '70%' }} className="bento-card-large-inner">
              <div style={{ background: '#0F172A', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '24px', boxShadow: '0 10px 20px rgba(15,23,42,0.1)' }}>
                <Layers size={28} />
              </div>
              <h3 style={{ fontSize: '32px', fontWeight: 700, color: '#0F172A', marginBottom: '16px', letterSpacing: '-0.02em' }}>Production Ready Architecture</h3>
              <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '18px' }}>
                Every single template is built on the Next.js App Router, strictly typed with TypeScript, and heavily optimized for performance.
              </p>
            </div>
          </motion.div>

          {/* Small Feature 1 */}
          <motion.div variants={itemVariants} whileHover={{ y: -8, scale: 1.05 }} className="bento-card-small" style={{ background: '#FFFFFF', borderRadius: '24px', padding: '40px', border: '1px solid #E2E8F0', boxShadow: '0 20px 40px rgba(15,23,42,0.05)' }}>
            <div style={{ background: '#FCE7F3', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DB2777', marginBottom: '24px' }}>
              <Zap size={28} />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}>Super Fast ⚡</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '16px' }}>
              Achieve 100/100 Lighthouse scores because slow websites cost money.
            </p>
          </motion.div>

          {/* Small Feature 2 */}
          <motion.div variants={itemVariants} whileHover={{ y: -8, scale: 1.05 }} className="bento-card-small" style={{ background: '#FFFFFF', borderRadius: '24px', padding: '40px', border: '1px solid #E2E8F0', boxShadow: '0 20px 40px rgba(15,23,42,0.05)' }}>
            <div style={{ background: '#E0F2FE', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284C7', marginBottom: '24px' }}>
              <Code2 size={28} />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}>Clean Code 💻</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '16px' }}>
              No spaghetti code here. Just beautiful, modular components you'll love reading.
            </p>
          </motion.div>

          {/* Medium Feature - Spans 2 columns */}
          <motion.div variants={itemVariants} whileHover={{ y: -8, scale: 1.02 }} className="bento-card-medium" style={{ gridColumn: 'span 2', background: '#F8FAFC', borderRadius: '24px', padding: '48px', border: '1px solid #E2E8F0', boxShadow: '0 20px 40px rgba(15,23,42,0.05)' }}>
             <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }} className="bento-card-medium-flex">
                <div style={{ flex: 1 }}>
                  <div style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F172A', marginBottom: '24px' }}>
                    <Cpu size={28} />
                  </div>
                  <h3 style={{ fontSize: '32px', fontWeight: 700, color: '#0F172A', marginBottom: '16px', letterSpacing: '-0.02em' }}>Seamless Integration</h3>
                  <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '18px' }}>
                    Copy, paste, and ship. Our components are designed to drop right into your existing projects without any friction.
                  </p>
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', width: '100%' }}>
                   {/* Decorative code block visual */}
                   <div style={{ width: '100%', height: '180px', background: '#0F172A', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', padding: '32px', fontFamily: 'monospace', color: '#E2E8F0', fontSize: '15px', boxShadow: '0 20px 40px rgba(15,23,42,0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                     <div><span style={{ color: '#EC4899' }}>import</span> {'{'} Components {'}'} <span style={{ color: '#EC4899' }}>from</span> <span style={{ color: '#38BDF8' }}>'@/ui'</span>;</div>
                     <br/>
                     <div style={{ color: '#64748B' }}>// Ship faster today</div>
                     <div>&lt;<span style={{ color: '#A78BFA' }}>Components</span> /&gt;</div>
                   </div>
                </div>
             </div>
          </motion.div>

        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .bento-grid-wrap {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .bento-card-large {
            grid-column: span 2 !important;
          }
          .bento-card-medium {
            grid-column: span 2 !important;
          }
        }
        @media (max-width: 768px) {
          .bento-grid-wrap {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .bento-card-large {
            grid-column: span 1 !important;
            padding: 32px 24px !important;
          }
          .bento-card-large-inner {
            max-width: 100% !important;
          }
          .bento-card-medium {
            grid-column: span 1 !important;
            padding: 32px 24px !important;
          }
          .bento-card-medium-flex {
            flex-direction: column !important;
            gap: 32px !important;
            align-items: stretch !important;
          }
          .bento-card-small {
            padding: 32px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
