import { useRef, useCallback, useEffect } from 'react';

const VELOCITY_THRESHOLD = 0.3; // px/ms
const DRAG_THRESHOLD = 8; // px minimum before committing to drag
const COLLAPSED_HEIGHT = 64;

function getViewportHeight() {
  return window.visualViewport?.height || window.innerHeight;
}

function getSnapPx(state) {
  if (state === 'collapsed') return COLLAPSED_HEIGHT;
  const vh = getViewportHeight();
  return state === 'half' ? vh * 0.50 : vh * 0.85;
}

function snapToNearest(currentHeight) {
  const vh = getViewportHeight();
  const stops = [
    { state: 'collapsed', px: COLLAPSED_HEIGHT },
    { state: 'half', px: vh * 0.5 },
    { state: 'full', px: vh * 0.85 },
  ];
  let best = stops[0];
  for (const s of stops) {
    if (Math.abs(currentHeight - s.px) < Math.abs(currentHeight - best.px)) best = s;
  }
  return best.state;
}

export default function useBottomSheetDrag(sheetRef, contentRef, sheetState, setSheetState) {
  const dragData = useRef(null);

  // --- Shared: apply height during drag ---
  const applyHeight = useCallback((height) => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    sheet.style.height = `${height}px`;
  }, [sheetRef]);

  // --- Shared: finish drag ---
  const finishDrag = useCallback((velocity, currentHeight) => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    sheet.style.transition = '';

    let newState;
    if (velocity > VELOCITY_THRESHOLD) {
      newState = sheetState === 'collapsed' ? 'half' : 'full';
    } else if (velocity < -VELOCITY_THRESHOLD) {
      newState = sheetState === 'full' ? 'half' : 'collapsed';
    } else {
      newState = snapToNearest(currentHeight);
    }

    // Let React update the height via state
    sheet.style.height = '';
    setSheetState(newState);
    dragData.current = null;
  }, [sheetRef, sheetState, setSheetState]);

  // --- Header drag (handle + tab bar) ---

  const onHeaderTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    dragData.current = {
      startY: touch.clientY,
      startHeight: getSnapPx(sheetState),
      lastY: touch.clientY,
      lastTime: Date.now(),
      velocity: 0,
      committed: false,
      source: 'header',
    };
  }, [sheetState]);

  const onHeaderTouchMove = useCallback((e) => {
    if (!dragData.current || dragData.current.source !== 'header') return;
    const touch = e.touches[0];
    const sheet = sheetRef.current;
    if (!sheet) return;

    const deltaY = dragData.current.startY - touch.clientY; // positive = up

    if (!dragData.current.committed) {
      if (Math.abs(deltaY) < DRAG_THRESHOLD) return;
      dragData.current.committed = true;
      sheet.style.transition = 'none';
    }

    e.preventDefault();

    const now = Date.now();
    const dt = now - dragData.current.lastTime;
    if (dt > 0) {
      dragData.current.velocity = (dragData.current.lastY - touch.clientY) / dt;
    }
    dragData.current.lastY = touch.clientY;
    dragData.current.lastTime = now;

    const vh = getViewportHeight();
    const maxHeight = vh * 0.85;
    const newHeight = Math.max(COLLAPSED_HEIGHT, Math.min(maxHeight, dragData.current.startHeight + deltaY));
    applyHeight(newHeight);
  }, [sheetRef, applyHeight]);

  const onHeaderTouchEnd = useCallback(() => {
    if (!dragData.current) return;
    if (!dragData.current.committed) {
      dragData.current = null;
      return;
    }

    const { startHeight, startY, lastY, velocity } = dragData.current;
    const vh = getViewportHeight();
    const deltaY = startY - lastY;
    const currentHeight = Math.max(COLLAPSED_HEIGHT, Math.min(vh * 0.85, startHeight + deltaY));
    finishDrag(velocity, currentHeight);
  }, [finishDrag]);

  const headerDragProps = {
    onTouchStart: onHeaderTouchStart,
    onTouchMove: onHeaderTouchMove,
    onTouchEnd: onHeaderTouchEnd,
    style: { touchAction: 'none' },
  };

  // --- Content pane pull-to-collapse ---

  useEffect(() => {
    const content = contentRef?.current;
    if (!content) return;

    let cd = null; // content drag state

    const onStart = (e) => {
      const touch = e.touches[0];
      cd = {
        startY: touch.clientY,
        startScrollTop: content.scrollTop,
        lastY: touch.clientY,
        lastTime: Date.now(),
        velocity: 0,
        hijacked: false,
      };
    };

    const onMove = (e) => {
      if (!cd) return;
      const touch = e.touches[0];
      const pullDown = touch.clientY - cd.startY; // positive = pulling down
      const now = Date.now();
      const dt = now - cd.lastTime;
      if (dt > 0) {
        cd.velocity = (cd.lastY - touch.clientY) / dt; // positive = moving up
      }
      cd.lastY = touch.clientY;
      cd.lastTime = now;

      if (!cd.hijacked) {
        if (cd.startScrollTop > 0 || pullDown < DRAG_THRESHOLD) return;
        cd.hijacked = true;
        const sheet = sheetRef.current;
        if (sheet) sheet.style.transition = 'none';
        cd.startHeight = getSnapPx(sheetState);
      }

      if (cd.hijacked) {
        e.preventDefault();
        const vh = getViewportHeight();
        const maxHeight = vh * 0.85;
        const newHeight = Math.max(COLLAPSED_HEIGHT, Math.min(maxHeight, cd.startHeight - pullDown));
        applyHeight(newHeight);
      }
    };

    const onEnd = () => {
      if (cd?.hijacked) {
        const pullDown = cd.lastY - cd.startY;
        const currentHeight = Math.max(COLLAPSED_HEIGHT, cd.startHeight - pullDown);
        finishDrag(cd.velocity, currentHeight);
      }
      cd = null;
    };

    content.addEventListener('touchstart', onStart, { passive: true });
    content.addEventListener('touchmove', onMove, { passive: false });
    content.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      content.removeEventListener('touchstart', onStart);
      content.removeEventListener('touchmove', onMove);
      content.removeEventListener('touchend', onEnd);
    };
  }, [contentRef, sheetRef, sheetState, setSheetState, applyHeight, finishDrag]);

  return { headerDragProps };
}
