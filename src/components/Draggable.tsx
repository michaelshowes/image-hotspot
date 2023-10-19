import { useState } from 'react';
import { useDrag } from '../hooks/useDrag';
import { HotspotProps } from './Hotspot/Hotspot';

type DraggableProps = {
  data: HotspotProps;
  children: React.ReactNode;
};

export default function Draggable({ children, data }: DraggableProps) {
  const [isClicked, setIsClicked] = useState(false);
  useDrag(data.id);

  return (
    <div
      id={data.id}
      className={'absolute left-[50%] top-[50%]'}
      style={{
        pointerEvents: data.isEditing ? 'auto' : 'none',
        cursor: isClicked ? 'grabbing' : 'grab'
      }}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
    >
      {children}
    </div>
  );
}
