import styled, { css } from 'styled-components';

// The sheet is always rendered at full height and translated off-screen.
// Bottom offset is applied as an inline style via the useViewportBottom hook
// to clear iOS browser toolbars that overlap fixed-bottom content.
//
// collapsed: only 48px tab bar visible
// half: 50% of viewport
// full: 85% of viewport

const COLLAPSED_HEIGHT = 64; // px — handle + tab bar

function getTranslate(state) {
  if (state === 'collapsed') return `calc(100% - ${COLLAPSED_HEIGHT}px)`;
  if (state === 'half') return 'calc(100% - 50dvh)';
  return '0';
}

function getTranslateFallback(state) {
  if (state === 'collapsed') return `calc(100% - ${COLLAPSED_HEIGHT}px)`;
  if (state === 'half') return 'calc(100% - 50vh)';
  return '0';
}

export const SheetBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 2400;
  opacity: ${props => (props.$visible ? 1 : 0)};
  pointer-events: ${props => (props.$visible ? 'auto' : 'none')};
  transition: opacity 0.3s;
`;

export const SheetContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  /* bottom: 0 lands behind iOS browser toolbars. The difference between
     vh (layout viewport, extends behind toolbar) and dvh (dynamic viewport,
     excludes toolbar) gives the exact toolbar height to offset by. */
  bottom: 0;
  bottom: calc(100vh - 100dvh);
  height: 85vh;
  height: 85dvh;
  background: white;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  z-index: 2500;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  will-change: transform;
  transform: translateY(${props => getTranslateFallback(props.$state)});
  transform: translateY(${props => getTranslate(props.$state)});
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
`;

// Wraps the drag handle + tab bar so the entire header area is draggable.
export const SheetHeader = styled.div`
  flex-shrink: 0;
`;

export const DragHandleArea = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px 0 4px;
  cursor: grab;
`;

export const DragHandleBar = styled.div`
  width: 36px;
  height: 4px;
  border-radius: 2px;
  background: ${props => props.theme.palette['grey-300']};
`;

export const TabBar = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.palette['grey-100']};
  flex-shrink: 0;
`;

export const Tab = styled.button`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 6px 0 8px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  color: ${props => (props.$active ? '#1976d2' : props.theme.palette['grey-500'])};
  position: relative;
  text-transform: none;

  ${props =>
    props.$active &&
    css`
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 20%;
        right: 20%;
        height: 2px;
        background: #1976d2;
        border-radius: 1px;
      }
    `}

  &:hover {
    background: ${props => props.theme.palette['grey-050']};
    color: ${props => (props.$active ? '#1976d2' : props.theme.palette['grey-700'])};
  }

  svg {
    font-size: 18px;
  }
`;

export const TabLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const TabBadge = styled.span`
  font-size: 9px;
  font-weight: 700;
  background: ${props => props.theme.palette['grey-100']};
  border-radius: 8px;
  padding: 1px 5px;
  color: ${props => props.theme.palette['grey-600']};
`;

export const DotIndicator = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #dc2626;
  position: absolute;
  top: 4px;
  right: calc(50% - 18px);
`;

export const ContentPane = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;
