import { createContext, useContext, useState } from 'react';
import { HotspotProps } from '../components/Hotspot/Hotspot';

type HotspotContext = {
  hotspots: HotspotProps[];
  setHotspots: React.Dispatch<React.SetStateAction<HotspotProps[]>>;
};

const HotspotContext = createContext<HotspotContext | null>(null);

export default function HotspotContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [hotspots, setHotspots] = useState<HotspotProps[]>([]);

  return (
    <HotspotContext.Provider value={{ hotspots, setHotspots }}>
      {children}
    </HotspotContext.Provider>
  );
}

export function useHotspots() {
  const context = useContext(HotspotContext);
  if (context === undefined) {
    throw new Error('useHotspots must be used within a HotspotContextProvider');
  }
  return context;
}
