import { useState } from 'react';
import { useHotspots } from '../../context/hotspotContext';
import { HotspotProps } from './Hotspot';

export default function HotspotForm({
  data,
  index
}: {
  data: HotspotProps;
  index: number;
}) {
  const [value, setValue] = useState(data.description);

  const context = useHotspots();
  const hotspots = context?.hotspots || [];
  const setHotspots = context?.setHotspots || (() => {});

  const editHotspot = (id: string) => {
    const hotspotIndex = hotspots.findIndex((hotspot) => hotspot.id === id);
    if (hotspotIndex !== -1) {
      setHotspots((prevHotspots) => {
        const newHotspots = [...prevHotspots];
        newHotspots[hotspotIndex] = {
          ...newHotspots[hotspotIndex],
          isEditing: true
        };
        return newHotspots;
      });
    }
  };

  const saveHotspot = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const updatedHotspots = hotspots.map((hotspot) => {
      if (hotspot.id === id) {
        return { ...hotspot, description: value, isEditing: false };
      }
      return hotspot;
    });
    setHotspots(updatedHotspots);
  };

  function deleteHotspot(id: string) {
    setHotspots(hotspots.filter((hotspot) => hotspot.id !== id));
  }

  return (
    <div className={'flex min-h-[60px] w-full items-center gap-6'}>
      <div
        className={
          'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-700 font-bold text-white'
        }
        style={{
          borderColor: data.isEditing ? 'red' : 'white',
          backgroundColor: data.isEditing ? 'red' : '#374151'
        }}
      >
        {index + 1}
      </div>

      <div className={'w-full'}>
        {data.isEditing ? (
          <form
            key={data.id}
            onSubmit={(e) => saveHotspot(e, data.id)}
            className={'flex w-full gap-6'}
          >
            <label className={'w-full'}>
              <textarea
                placeholder={'Enter description'}
                className={'m-w-[300px] mr-auto w-full border'}
                defaultValue={data.description}
                onChange={(e) => setValue(e.target.value)}
              />
            </label>
            <button>Save</button>
            <button
              type={'button'}
              onClick={() => deleteHotspot(data.id)}
            >
              Delete
            </button>
          </form>
        ) : (
          <div className={'flex items-center gap-6'}>
            <p className={'mr-auto'}>{data.description}</p>
            <button onClick={() => editHotspot(data.id)}>Edit</button>
            <button
              type={'button'}
              onClick={() => deleteHotspot(data.id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
