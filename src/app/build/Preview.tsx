'use client';

import { CameraControls, Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useRef } from 'react';
import { useCustomizerControls } from './context';
import { asImageSrc } from '@prismicio/client';
import { SkateboardModel } from '@/components/SkateboardModel';

type Props = {
  wheelTextureUrls: string[];
  deckTextureUrls: string[];
};

const DEFAULT_WHEEL_TEXTURE = '/skateboard/SkateWheel1.png';
const DEFAULT_DECK_TEXTURE = '/skateboard/Deck.webp';
const DEFAULT_TRUCK_COLOR = '#6F6E6A';
const DEFAULT_BOLT_COLOR = '#6F6E6A';
const DEFAULT_ENVIRONMENT_COLOR = '#3B3A3A';

export default function Preview({ wheelTextureUrls, deckTextureUrls }: Props) {
  const cameraControls = useRef<CameraControls>(null);
  const { selectedBolt, selectedDeck, selectedTruck, selectedWheel } =
    useCustomizerControls();

  const wheelTextureUrl =
    asImageSrc(selectedWheel?.texture) ?? DEFAULT_WHEEL_TEXTURE;
  const deckTextureUrl =
    asImageSrc(selectedDeck?.texture) ?? DEFAULT_DECK_TEXTURE;
  const truckColor = selectedTruck?.color ?? DEFAULT_TRUCK_COLOR;
  const boltColor = selectedBolt?.color ?? DEFAULT_BOLT_COLOR;

  return (
    <Canvas>
      <Suspense fallback={null}>
        <SkateboardModel
          wheelTextureURLs={wheelTextureUrls}
          wheelTextureURL={wheelTextureUrl}
          deckTextureURLs={deckTextureUrls}
          deckTextureURL={deckTextureUrl}
          boltColor={boltColor}
          truckColor={truckColor}
          pose="side"
        />
        <CameraControls
          ref={cameraControls}
          minDistance={0.2}
          maxDistance={4}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}
