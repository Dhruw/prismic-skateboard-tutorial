'use client';
import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';

type Props = {};

function InteractiveSkateboard({}: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Canvas
        className="min-h-[60rem] w-full"
        camera={{ position: [1.5, 1, 1.4], fov: 55 }}
      >
        <Suspense fallback="">
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Scene() {
  return (
    <group>
      {/* <pointLight position={[1, 1, 1]} intensity={5} /> */}
      {/* We can have many pointlights */}
      <OrbitControls />
      {/* <Environment preset='forest' background /> */}
      <Environment files={'/hdr/warehouse-256.hdr'} />
      <mesh>
        <meshStandardMaterial />
        <boxGeometry />
      </mesh>
    </group>
  );
}

export default InteractiveSkateboard;
