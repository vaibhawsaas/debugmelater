'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AbstractShapes() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const scrollY = window.scrollY || 0;
    // Rotate the entire group based on scroll position to create different "frames"
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      scrollY * 0.001,
      0.05
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      scrollY * 0.0005,
      0.05
    );
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[-3, 1, -2]} rotation={[Math.PI / 4, 0, 0]}>
          <torusKnotGeometry args={[1, 0.3, 128, 32]} />
          <MeshTransmissionMaterial backside backsideThickness={5} thickness={2} roughness={0} transmission={1} ior={1.5} chromaticAberration={0.05} color="#7C3AED" />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[4, -1, -3]} rotation={[0, Math.PI / 3, 0]}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial color="#06B6D4" wireframe />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={1} floatIntensity={3}>
        <mesh position={[0, -3, 2]} rotation={[Math.PI / 6, Math.PI / 6, 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshPhysicalMaterial color="#0A0C12" metalness={0.9} roughness={0.1} clearcoat={1} />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.5, 1.5, 1.5)]} />
            <lineBasicMaterial color="#7C3AED" linewidth={2} />
          </lineSegments>
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#0A0C12']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#7C3AED" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#06B6D4" />

        <AbstractShapes />

        <Environment preset="city" />
        <ContactShadows position={[0, -4, 0]} opacity={0.5} scale={20} blur={2} far={4} color="#000000" />
      </Canvas>
    </div>
  );
}
