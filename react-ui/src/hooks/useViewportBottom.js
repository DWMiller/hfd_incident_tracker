import { useState, useEffect } from 'react';

// Returns the pixel offset needed to clear browser UI at the bottom of the screen
// (e.g. iOS Chrome/Safari toolbar). Uses the visualViewport API to detect the
// gap between the layout viewport bottom and the actual visible bottom.
export default function useViewportBottom() {
  const [bottom, setBottom] = useState(() => getBottom());

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const update = () => setBottom(getBottom());
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    return () => {
      vv.removeEventListener('resize', update);
      vv.removeEventListener('scroll', update);
    };
  }, []);

  return bottom;
}

function getBottom() {
  const vv = window.visualViewport;
  if (!vv) return 0;
  // The gap between the layout viewport bottom and visual viewport bottom
  // is the height of any browser toolbar overlapping from the bottom.
  return Math.max(0, window.innerHeight - (vv.height + vv.offsetTop));
}
