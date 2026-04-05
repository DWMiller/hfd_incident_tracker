import { useRef, useCallback, useEffect } from 'react';

const VELOCITY_THRESHOLD = 0.3; // px/ms
const DRAG_THRESHOLD = 8; // px — minimum movement before committing to a drag

function getViewportHeight() {
  return window.visualViewport?.height || window.innerHeight;
}

function getSnapPx(state) {
  if (state === 'collapsed') return 64;
  const vh = getViewportHeight();
  return state === 'half' ? vh * 0.50 : vh * 0.85;
}

export default function useBottomSheetDrag(sheetRef, contentRef, sheetState, setSheetState) {
  const dragData = useRef(null);

  // --- Header area drag (handle + tab bar) ---
  // Always initiates sheet drag regardless of direction.

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

    const deltaY = dragData.current.startY - touch.clientY;

    // Wait for movement to exceed threshold before committing
    if (!dragData.current.committed) {
      if (Math.abs(deltaY) < DRAG_THRESHOLD) return;
      dragData.current.committed = true;
      sheet.style.transition = 'none';
    }

    e.preventDefault(); // prevent scroll once committed

    const now = Date.now();
    const dt = now - dragData.current.lastTime;
    if (dt > 0) {
      dragData.current.velocity = (dragData.current.lastY - touch.clientY) / dt;
    }
    dragData.current.lastY = touch.clientY;
    dragData.current.lastTime = now;

    const vh = getViewportHeight();
    const sheetFullHeight = vh * 0.85;
    const newHeight = Math.max(48, Math.min(sheetFullHeight, dragData.current.startHeight + deltaY));
    const translatePx = sheetFullHeight - newHeight;
    sheet.style.transform = `translateY(${translatePx}px)`;
  }, [sheetRef]);

  const onTouchEnd = useCallback(() => {
    if (!dragData.current) return;
    const sheet = sheetRef.current;
    if (!sheet) return;

    // If never committed to a drag, let the tap through
    if (!dragData.current.committed) {
      dragData.current = null;
      return;
    }

    sheet.style.transition = '';
    sheet.style.transform = '';

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

    setSheetState(newState);
    dragData.current = null;
  }, [sheetRef, sheetState, setSheetState]);

  // --- Content pane pull-to-collapse ---
  // When the content is scrolled to the top and the user pulls down,
  // hijack the touch to drag the sheet down.

  useEffect(() => {
    const content = contentRef?.current;
    if (!content) return;

    let contentDrag = null;

    const onStart = (e) => {
      const touch = e.touches[0];
      contentDrag = {
        startY: touch.clientY,
        startScrollTop: content.scrollTop,
        lastY: touch.clientY,
        lastTime: Date.now(),
        velocity: 0,
        hijacked: false,
      };
    };

    const onMove = (e) => {
      if (!contentDrag) return;
      const touch = e.touches[0];
      const deltaY = touch.clientY - contentDrag.startY; // positive = pulling down
      const now = Date.now();
      const dt = now - contentDrag.lastTime;
      if (dt > 0) {
        contentDrag.velocity = (contentDrag.lastY - touch.clientY) / dt;
      }
      contentDrag.lastY = touch.clientY;
      contentDrag.lastTime = now;

      // Only hijack if: at scroll top, pulling down, past threshold
      if (!contentDrag.hijacked) {
        if (contentDrag.startScrollTop > 0 || deltaY < DRAG_THRESHOLD) return;
        // Commit to sheet drag
        contentDrag.hijacked = true;
        const sheet = sheetRef.current;
        if (sheet) sheet.style.transition = 'none';

        dragData.current = {
          startY: contentDrag.startY,
          startHeight: getSnapPx(sheetState),
          lastY: touch.clientY,
          lastTime: now,
          velocity: contentDrag.velocity,
          committed: true,
          source: 'content',
        };
      }

      if (contentDrag.hijacked) {
        e.preventDefault();
        const sheet = sheetRef.current;
        if (!sheet || !dragData.current) return;
        dragData.current.lastY = touch.clientY;
        dragData.current.lastTime = now;
        dragData.current.velocity = contentDrag.velocity;

        const pullDelta = contentDrag.startY - touch.clientY; // negative = pulling down
        const vh = getViewportHeight();
        const sheetFullHeight = vh * 0.85;
        const newHeight = Math.max(48, Math.min(sheetFullHeight, dragData.current.startHeight + pullDelta));
        const translatePx = sheetFullHeight - newHeight;
        sheet.style.transform = `translateY(${translatePx}px)`;
      }
    };

    const onEnd = () => {
      if (contentDrag?.hijacked) {
        // Reuse the shared onTouchEnd logic
        const sheet = sheetRef.current;
        if (sheet && dragData.current) {
          sheet.style.transition = '';
          sheet.style.transform = '';

          const { velocity, startHeight, startY, lastY } = dragData.current;
          const vh = getViewportHeight();
          const sheetFullHeight = vh * 0.85;
          const deltaY = startY - lastY;
          const currentHeight = Math.max(48, Math.min(sheetFullHeight, startHeight + deltaY));

          let newState;
          if (velocity < -VELOCITY_THRESHOLD) {
            newState = sheetState === 'full' ? 'half' : 'collapsed';
          } else {
            const collapsedPx = 48;
            const halfPx = vh * 0.5;
            const dCollapsed = Math.abs(currentHeight - collapsedPx);
            const dHalf = Math.abs(currentHeight - halfPx);
            const dFull = Math.abs(currentHeight - sheetFullHeight);
            if (dCollapsed <= dHalf && dCollapsed <= dFull) newState = 'collapsed';
            else if (dHalf <= dFull) newState = 'half';
            else newState = 'full';
          }
          setSheetState(newState);
        }
        dragData.current = null;
      }
      contentDrag = null;
    };

    content.addEventListener('touchstart', onStart, { passive: true });
    content.addEventListener('touchmove', onMove, { passive: false });
    content.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      content.removeEventListener('touchstart', onStart);
      content.removeEventListener('touchmove', onMove);
      content.removeEventListener('touchend', onEnd);
    };
  }, [contentRef, sheetRef, sheetState, setSheetState]);

  const headerDragProps = {
    onTouchStart: onHeaderTouchStart,
    onTouchMove: onHeaderTouchMove,
    onTouchEnd: onTouchEnd,
    style: { touchAction: 'none' },
  };

  return { headerDragProps };
}
