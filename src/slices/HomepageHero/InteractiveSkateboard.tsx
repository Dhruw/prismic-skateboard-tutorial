'use client';
import { SkateboardModel } from '@/components/SkateboardModel';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';

type Props = {
  deckTextureURL: string;
  wheelTextureURL: string;
  truckColor: string;
  boltColor: string;
};

function InteractiveSkateboard({
  deckTextureURL,
  wheelTextureURL,
  truckColor,
  boltColor,
}: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Canvas
        className="min-h-[60rem] w-full"
        camera={{ position: [1.5, 1, 1.4], fov: 55 }}
      >
        {/* {slice.} */}
        <Suspense fallback="">
          <Scene
            deckTextureURL={deckTextureURL}
            wheelTextureURL={wheelTextureURL}
            truckColor={truckColor}
            boltColor={boltColor}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Scene({
  deckTextureURL,
  wheelTextureURL,
  truckColor,
  boltColor,
}: Props) {
  return (
    <group>
      {/* <pointLight position={[1, 1, 1]} intensity={5} /> */}
      {/* We can have many pointlights */}
      <OrbitControls />
      {/* <Environment preset='forest' background /> */}
      <Environment files={'/hdr/warehouse-256.hdr'} />
      {/* <mesh>
        <meshStandardMaterial />
        <boxGeometry />
      </mesh> */}
      <SkateboardModel
        deckTextureURL={deckTextureURL}
        deckTextureURLs={[deckTextureURL]}
        wheelTextureURL={wheelTextureURL}
        wheelTextureURLs={[wheelTextureURL]}
        truckColor={truckColor}
        boltColor={boltColor}
      />
      <ContactShadows opacity={0.6} position={[0, -0.08, 0]} />
    </group>
  );
}

export default InteractiveSkateboard;
