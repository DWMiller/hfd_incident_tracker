import styled from 'styled-components';

export const IncidentPanelWrapper = styled.div`
  position: absolute;
  max-height: calc(100% - 35px);
  z-index: 90;
  transform: translateY(-100%);
  width: 300px;
  background: rgba(236, 240, 241, 1);
  transition-duration: 0.195s;
  transition-timing-function: ease-out;
  box-sizing: border-box;
  right: 0;
  overflow-x: visible;
  overflow-y: scroll;
  box-shadow: -2px 2px 5px -2px rgba(0, 0, 0, 0.8);
  z-index: 2000;

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

export const IncidentWrapper = styled.div`
  position: relative;
  margin: 0.5em 0.25em;
  padding: 0.5em 0.5em 0.5em 1em;
  cursor: pointer;
  background: white;
  box-shadow: 1px 2px 5px -1px rgba(0, 0, 0, 0.8);

  &:active {
    box-shadow: inset 1px 1px 5px -1px rgba(0, 0, 0, 0.9);
    transform: translate(1px, 1px);
    border: none;
  }

  &:hover {
    background-color: rgba(41, 128, 185, 1);
    color: white;

    .link a {
      color: white;
    }
  }

  span {
    display: block;
  }

  img {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
  }

  .location {
    font-weight: bold;
    max-width: 220px;
  }

  .category {
    font-size: smaller;
    font-variant: small-caps;
  }

  .address {
    margin: 0.5em 0;
  }

  .time {
    font-size: smaller;
    text-align: right;
  }

  .link {
    font-size: smaller;
    float: left;
  }
`;
