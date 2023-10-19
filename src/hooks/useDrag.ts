import { useEffect, useRef } from 'react';

export function useDrag(id: string): void {
  const isClicked = useRef<boolean>(false);

  useEffect(() => {
    const target = document.getElementById(id);

    if (!target) throw new Error('Element with given id does not exist');

    const container = target.parentElement;

    if (!container) throw new Error('Container element does not exist');

    const onMouseDown = () => {
      isClicked.current = true;
    };

    const onMouseUp = () => {
      isClicked.current = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const containerRect = container.getBoundingClientRect();

      const x = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      const y = ((e.clientY - containerRect.top) / containerRect.height) * 100;

      const dragItemRect = target.getBoundingClientRect();
      const dragItemCenterX = dragItemRect.width / 2;
      const dragItemCenterY = dragItemRect.height / 2;

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
  }, [id]);
}
