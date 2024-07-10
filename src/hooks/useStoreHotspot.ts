import { create } from 'zustand';
import { HotspotProps } from '../components/Hotspot/Hotspot';

type useHotspotStoreProps = {
  hotspots: HotspotProps[];
  setHotspots: React.Dispatch<React.SetStateAction<HotspotProps[]>>;
};

export const useStoreHotspot = create<useHotspotStoreProps>((set) => ({
  hotspots: [
    {
      id: '1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam nisl nisl nec nisl.',
      isEditing: false
    }
  ],
  setHotspots: (hotspots) => set({ hotspots })
}));
