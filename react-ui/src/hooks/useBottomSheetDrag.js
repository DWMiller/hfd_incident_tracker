import { useRef, useCallback } from 'react';

const VELOCITY_THRESHOLD = 0.4; // px/ms

function getViewportHeight() {
  // visualViewport gives the actual visible area on mobile (excludes browser chrome)
  return window.visualViewport?.height || window.innerHeight;
}

function getSnapPx(state) {
  if (state === 'collapsed') return 48;
  const vh = getViewportHeight();
  return state === 'half' ? vh * 0.50 : vh * 0.85;
}

export default function useBottomSheetDrag(sheetRef, sheetState, setSheetState) {
  const dragData = useRef(null);

  const onTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    const sheet = sheetRef.current;
    if (!sheet) return;

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

    const vh = getViewportHeight();
    const sheetFullHeight = vh * 0.85;
    const deltaY = dragData.current.startY - touch.clientY;
    const newHeight = Math.max(48, Math.min(sheetFullHeight, dragData.current.startHeight + deltaY));

    // translateY relative to the sheet's own height (100%), not viewport units
    const translatePx = sheetFullHeight - newHeight;
    sheet.style.transform = `translateY(${translatePx}px)`;
  }, [sheetRef]);

  const onTouchEnd = useCallback(() => {
    if (!dragData.current) return;
    const sheet = sheetRef.current;
    if (!sheet) return;

    sheet.style.transition = '';

    const { velocity, startHeight, startY, lastY } = dragData.current;
    const vh = getViewportHeight();
    const sheetFullHeight = vh * 0.85;
    const deltaY = startY - lastY;
    const currentHeight = Math.max(48, Math.min(sheetFullHeight, startHeight + deltaY));

    let newState;
    if (velocity > VELOCITY_THRESHOLD) {
      newState = sheetState === 'collapsed' ? 'half' : 'full';
    } else if (velocity < -VELOCITY_THRESHOLD) {
      newState = sheetState === 'full' ? 'half' : 'collapsed';
    } else {
      const collapsedPx = 48;
      const halfPx = vh * 0.5;
      const fullPx = sheetFullHeight;

      const dCollapsed = Math.abs(currentHeight - collapsedPx);
      const dHalf = Math.abs(currentHeight - halfPx);
      const dFull = Math.abs(currentHeight - fullPx);

      if (dCollapsed <= dHalf && dCollapsed <= dFull) newState = 'collapsed';
      else if (dHalf <= dFull) newState = 'half';
      else newState = 'full';
    }

    // Clear inline transform — let CSS take over with the new state
    sheet.style.transform = '';

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
