import { useRef, useCallback } from 'react';

const VELOCITY_THRESHOLD = 0.4; // px/ms

// Snap points as fractions of viewport height visible above bottom
const SNAP_POINTS = {
  collapsed: 48, // px — just the tab bar
  half: 0.50,    // 50vh
  full: 0.85,    // 85vh
};

function getSnapPx(state) {
  if (state === 'collapsed') return SNAP_POINTS.collapsed;
  const vh = window.innerHeight;
  return state === 'half' ? vh * SNAP_POINTS.half : vh * SNAP_POINTS.full;
}

export default function useBottomSheetDrag(sheetRef, sheetState, setSheetState) {
  const dragData = useRef(null);

  const onTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    const sheet = sheetRef.current;
    if (!sheet) return;

    // Disable CSS transition during drag
    sheet.style.transition = 'none';

    dragData.current = {
      startY: touch.clientY,
      startHeight: getSnapPx(sheetState),
      lastY: touch.clientY,
      lastTime: Date.now(),
      velocity: 0,
    };
  }, [sheetRef, sheetState]);

  const onTouchMove = useCallback((e) => {
    if (!dragData.current) return;
    const touch = e.touches[0];
    const sheet = sheetRef.current;
    if (!sheet) return;

    const now = Date.now();
    const dt = now - dragData.current.lastTime;
    if (dt > 0) {
      dragData.current.velocity = (dragData.current.lastY - touch.clientY) / dt;
    }
    dragData.current.lastY = touch.clientY;
    dragData.current.lastTime = now;

    const deltaY = dragData.current.startY - touch.clientY; // positive = dragging up
    const newHeight = Math.max(48, Math.min(window.innerHeight * 0.85, dragData.current.startHeight + deltaY));

    const translate = window.innerHeight * 0.85 - newHeight;
    sheet.style.transform = `translateY(${translate}px)`;
  }, [sheetRef]);

  const onTouchEnd = useCallback(() => {
    if (!dragData.current) return;
    const sheet = sheetRef.current;
    if (!sheet) return;

    // Re-enable transition
    sheet.style.transition = '';

    const { velocity, startHeight, startY, lastY } = dragData.current;
    const deltaY = startY - lastY;
    const currentHeight = Math.max(48, Math.min(window.innerHeight * 0.85, startHeight + deltaY));

    let newState;
    if (velocity > VELOCITY_THRESHOLD) {
      // Flinging up
      newState = sheetState === 'collapsed' ? 'half' : 'full';
    } else if (velocity < -VELOCITY_THRESHOLD) {
      // Flinging down
      newState = sheetState === 'full' ? 'half' : 'collapsed';
    } else {
      // Snap to nearest
      const vh = window.innerHeight;
      const collapsedPx = 48;
      const halfPx = vh * 0.5;
      const fullPx = vh * 0.85;

      const dCollapsed = Math.abs(currentHeight - collapsedPx);
      const dHalf = Math.abs(currentHeight - halfPx);
      const dFull = Math.abs(currentHeight - fullPx);

      if (dCollapsed <= dHalf && dCollapsed <= dFull) newState = 'collapsed';
      else if (dHalf <= dFull) newState = 'half';
      else newState = 'full';
    }

    // Apply final snap position
    const translate = window.innerHeight * 0.85 - getSnapPx(newState);
    sheet.style.transform = `translateY(${translate}px)`;

    setSheetState(newState);
    dragData.current = null;
  }, [sheetRef, sheetState, setSheetState]);

  const dragHandleProps = {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    style: { touchAction: 'none' },
  };

  return { dragHandleProps };
}
