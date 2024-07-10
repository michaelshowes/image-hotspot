import { useEffect, useRef } from 'react';
import { useHotspots } from '../context/hotspotContext';
import { HotspotProps } from '../components/Hotspot/Hotspot';

export function useDrag(id: string): void {
  const isClicked = useRef<boolean>(false);
  const context = useHotspots();

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) throw new Error('Element with given id does not exist');

    const container = target.parentElement;
    if (!container) throw new Error('Container element does not exist');

    const setCoords = (e: MouseEvent) => {
      const containerRect = container.getBoundingClientRect();
      const x = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      const y = ((e.clientY - containerRect.top) / containerRect.height) * 100;
      return { x, y };
    };

    const onMouseDown = () => {
      isClicked.current = true;
    };

    const onMouseUp = (e: MouseEvent) => {
      const { x, y } = setCoords(e);

      context?.setHotspots((prev: HotspotProps[]) => {
        const newHotspots = prev.map((hotspot) => {
          if (hotspot.id === id) {
            return {
              ...hotspot,
              x,
              y
            };
          }
          return hotspot;
        });
        return newHotspots;
      });

      isClicked.current = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const { x, y } = setCoords(e);
      const dragItemRect = target.getBoundingClientRect();
      const dragItemCenterX = dragItemRect.width / 2;
      const dragItemCenterY = dragItemRect.height / 2;

      if (x < 0 || x > 100 || y < 0 || y > 100) return;

      target.style.left = `calc(${x}% - ${dragItemCenterX}px)`;
      target.style.top = `calc(${y}% - ${dragItemCenterY}px)`;
    };

    target.addEventListener('mousedown', onMouseDown);
    target.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);

    const cleanup = () => {
      target.removeEventListener('mousedown', onMouseDown);
      target.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseUp);
    };

    return cleanup;
  }, [id, context]);
}


