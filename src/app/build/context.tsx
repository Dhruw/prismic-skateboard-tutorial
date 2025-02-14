'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Content } from '@prismicio/client';

type CustomizerControlContextType = {
  selectedWheel?: Content.BoardCustomizerDocumentDataWheelsItem;
  setWheel: (wheel: Content.BoardCustomizerDocumentDataWheelsItem) => void;
  selectedDeck?: Content.BoardCustomizerDocumentDataDecksItem;
  setDeck: (wheel: Content.BoardCustomizerDocumentDataWheelsItem) => void;
  selectedTruck?: Content.BoardCustomizerDocumentDataMetalsItem;
  setTruck?: (truck: Content.BoardCustomizerDocumentDataMetalsItem) => void;
  selectedBolt?: Content.BoardCustomizerDocumentDataMetalsItem;
  setBolt?: (bolt: Content.BoardCustomizerDocumentDataMetalsItem) => void;
};

const DEFAULT_CONTEXT: CustomizerControlContextType = {
  setWheel: () => {},
  setDeck: () => {},
  setTruck: () => {},
  setBolt: () => {},
};

const CustomizerControlContext = createContext(DEFAULT_CONTEXT);

type CustomizerControlProviderProps = {
  defaultWheel?: Content.BoardCustomizerDocumentDataWheelsItem;
  defaultDeck?: Content.BoardCustomizerDocumentDataDecksItem;
  defaultTruck?: Content.BoardCustomizerDocumentDataMetalsItem;
  defaultBolt?: Content.BoardCustomizerDocumentDataMetalsItem;
  children?: ReactNode;
};

export function CustomizerControlProvider({
  defaultWheel,
  defaultDeck,
  defaultTruck,
  defaultBolt,
  children,
}: CustomizerControlProviderProps) {
  const [selectedWheel, setWheel] = useState(defaultWheel);
  const [selectedDeck, setDeck] = useState(defaultDeck);
  const [selectedTruck, setTruck] = useState(defaultTruck);
  const [selectedBolt, setBolt] = useState(defaultBolt);
  const value = useMemo<CustomizerControlContextType>(
    () => ({
      selectedWheel,
      setWheel,
      selectedDeck,
      setDeck,
      selectedTruck,
      setTruck,
      selectedBolt,
      setBolt,
    }),
    [selectedWheel, selectedDeck, selectedTruck, selectedBolt]
  );

  return (
    <CustomizerControlContext.Provider value={value}>
      {children}
    </CustomizerControlContext.Provider>
  );
}

export function useCustomizerControls() {
  return useContext(CustomizerControlContext);
}
