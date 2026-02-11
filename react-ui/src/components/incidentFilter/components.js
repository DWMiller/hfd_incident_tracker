import styled from 'styled-components';

export const FilterPanel = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  z-index: 2000;
  background: white;
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows['shadow-200']};
  overflow: hidden;

  @media (min-width: 800px) {
    right: auto;
    width: 320px;
  }
`;

export const PanelHeader = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  cursor: pointer;
  gap: 8px;
  text-transform: none;

  &:hover {
    background: ${props => props.theme.palette['grey-050']};
    color: inherit;
  }
`;

export const HeaderTitle = styled.span`
  font-weight: 700;
  font-size: ${props => props.theme.typeScale.base};
  color: ${props => props.theme.palette['grey-900']};
`;

export const HeaderCount = styled.span`
  font-size: ${props => props.theme.typeScale.small};
  color: ${props => props.theme.palette['grey-500']};
  margin-left: auto;
`;

export const HeaderChevron = styled.span`
  display: flex;
  align-items: center;
  color: ${props => props.theme.palette['grey-400']};
  font-size: 14px;
`;

export const PanelContent = styled.div`
  padding: 12px 0 0;
`;

export const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px 10px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: ${props => props.theme.typeScale.extraSmall};
    color: ${props => props.theme.palette['grey-500']};
    padding: 4px 0;
    text-transform: none;

    &:hover {
      background: none;
      color: ${props => props.theme.palette['grey-700']};
    }
  }
`;

export const TypeList = styled.div`
  max-height: min(400px, 50vh);
  overflow-y: auto;
`;

export const TypeRowWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  gap: 12px;
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background-color: ${props => props.theme.palette['grey-050']};
  }
`;

export const IconSquare = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 8px;
  background-color: ${props => `${props.$color || '#6B7280'}15`};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
`;

export const TypeInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const TypeLabel = styled.span`
  display: block;
  font-weight: 400;
  font-size: ${props => props.theme.typeScale.small};
  color: ${props => props.theme.palette['grey-900']};
`;

export const ActiveCount = styled.span`
  display: block;
  font-size: ${props => props.theme.typeScale.extraSmall};
  color: ${props => props.theme.palette['grey-500']};
`;

export const EyeToggle = styled.span`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${props => (props.$visible ? '#1976d2' : props.theme.palette['grey-300'])};
  padding: 4px;
`;

export const Disclaimer = styled.p`
  padding: 12px 16px;
  margin: 0;
  font-size: 11px;
  color: ${props => props.theme.palette['grey-500']};
  line-height: 1.4;

  a {
    color: #1976d2;
  }
`;
