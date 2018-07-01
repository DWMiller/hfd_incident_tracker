import styled from 'styled-components';

export const IncidentPanelWrapper = styled.div`
  position: absolute;
  z-index: 90;
  transform: translateY(-100%);
  width: 300px;
  background: rgba(236, 240, 241, 1);
  transition-duration: 0.195s;
  transition-timing-function: ease-out;
  box-sizing: border-box;
  right: 0;
  max-height: 100%;
  overflow-x: visible;
  overflow-y: scroll;
  box-shadow: -2px 2px 5px -2px rgba(0, 0, 0, 0.8);

  &.show {
    transition-duration: 0.225s;
    transition-timing-function: ease-in;
    transform: translateY(35px);
  }
`;

export const ToggleButton = styled.button`
  background-color: white;
  position: absolute;
  z-index: 100;
  right: 0;
  height: 35px;
  width: 300px;
  border: none;
  box-shadow: -2px 2px 5px -2px rgba(0, 0, 0, 0.8);
  border-top: none;
  border-right: 1px dotted black;
  font-variant: small-caps;
  cursor: pointer;
`;
