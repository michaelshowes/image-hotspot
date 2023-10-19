import { v4 as uuid } from 'uuid';

import Hotspot, { HotspotProps } from './components/Hotspot/Hotspot';
import Draggable from './components/Draggable';
import { useHotspots } from './context/hotspotContext';
import HotspotForm from './components/Hotspot/HotspotForm';
import HotspotDescription from './components/Hotspot/HotspotDescription';

import './style.scss';

export default function App() {
  const context = useHotspots();

  const hotspots: HotspotProps[] = context?.hotspots || [];
  const setHotspots = context?.setHotspots || (() => {});

  const isEditing = hotspots.some((hotspot) => hotspot.isEditing);

  const createHotspot = () => {
    const id = uuid();
    setHotspots((prev) => [...prev, { id, description: '', isEditing: true }]);
    console.log(hotspots);
  };

  return (
    <main>
      <section>
        {/* Equipment Viewer */}
        <div className={'mb-9 grid grid-cols-2 place-items-center'}>
          <div className={'flex flex-col gap-4'}>
            {hotspots.map((hotspot, index) => (
              <HotspotDescription
                key={hotspot.id}
                data={hotspot}
                index={index}
              />
            ))}
          </div>
          <div className={'relative select-none'}>
            <img
              src='/forklift.jpg'
              alt=''
            />
            {hotspots.map((hotspot, index) => (
              <Draggable
                key={hotspot.id}
                data={hotspot}
              >
                <Hotspot
                  data={hotspot}
                  index={index}
                />
              </Draggable>
            ))}
          </div>
        </div>

        <div className={'mx-auto flex max-w-[700px] flex-col items-center'}>
          <button
            onClick={createHotspot}
            disabled={isEditing}
            className={
              'mb-9 rounded-md border bg-black px-4 py-2 text-white transition-all hover:bg-gray-700'
            }
          >
            New Hotspot
          </button>
          {hotspots.map((hotspot, index) => (
            <HotspotForm
              key={hotspot.id}
              data={hotspot}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
