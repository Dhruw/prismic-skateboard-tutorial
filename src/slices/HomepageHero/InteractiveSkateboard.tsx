'use client';
import * as THREE from 'three';
import { SkateboardModel } from '@/components/SkateboardModel';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import React, { Suspense, useRef } from 'react';
import gsap from 'gsap';

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
  const containerRef = useRef<THREE.Group>(null);

  function onClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    const board = containerRef.current;

    if (!board) return;

    const { name } = event.object;

    ollie(board);
  }

  function ollie(board: THREE.Group) {
    jumpBoard(board);

    gsap
      .timeline()
      .to(board.rotation, {
        x: -0.6,
        duration: 0.26,
        ease: 'none',
      })
      .to(board.rotation, {
        x: 0.4,
        duration: 0.82,
        ease: 'power2.in',
      })
      .to(board.rotation, {
        x: 0,
        duration: 0.26,
        ease: 'none',
      });
  }
  function jumpBoard(board: THREE.Group) {
    gsap
      .timeline()
      .to(board.position, {
        y: 0.8,
        duration: 0.51,
        ease: 'power2.out',
        delay: 0.26,
      })
      .to(board.position, {
        y: 0.0,
        duration: 0.43,
        ease: 'power2.in',
        // delay: 0.26,
      });
  }
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
      <group ref={containerRef} position={[-0.25, 0, -0.635]}>
        <group position={[0, -0.86, 0.635]}>
          <SkateboardModel
            deckTextureURL={deckTextureURL}
            deckTextureURLs={[deckTextureURL]}
            wheelTextureURL={wheelTextureURL}
            wheelTextureURLs={[wheelTextureURL]}
            truckColor={truckColor}
            boltColor={boltColor}
            constantWheelSpin
          />
          <mesh position={[0, 0.27, 0]} name="middle" onClick={onClick}>
            <boxGeometry args={[0.6, 0.1, 1.2]} />
            <meshStandardMaterial visible={true} />
          </mesh>
        </group>
      </group>
      <ContactShadows opacity={0.6} position={[0, -0.08, 0]} />
    </group>
  );
}

export default InteractiveSkateboard;
