import styled from 'styled-components';

export const FilterContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  min-width: 150px;
  max-width: 100%;
  transition-duration: 0.195s;
  transition-timing-function: ease-out;
  background-color: #ecf0f1;
  border: 1px solid lightgray;
  border-right: none;
  box-shadow: ${props => props.theme.shadows['shadow-200']};
  z-index: 2000;

  @media (min-width: 800px) {
    left: 15px;
  }

  &.collapsed {
    transform: translateY(calc(100% - 35px));
  }

  .title {
    display: block;
    width: 100%;
    height: 35px;
  }

  .title svg {
    margin-left: 1em;
  }

  .content {
    padding: 0.5em 0.5em 0 0.5em;
    margin-bottom: 0.5em;
  }

  .incidentFilterPanel__controls,
  .incidentFilterPanel__type {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 0 0.5em;
    background: white;
    border-bottom: 1px solid lightgray;
    border-left: 1px solid lightgray;
    border-right: 1px solid lightgray;
  }

  .incidentFilterPanel__controls {
    border-top: 1px solid lightgray;
    padding: 0 0.5em;
  }

  .incidentFilterPanel__type img {
    width: 20px;
    height: 20px;
    object-fit: cover;
  }

  .incidentFilterPanel__controls svg,
  .incidentFilterPanel__type img,
  .incidentFilterPanel__type svg {
    padding: 0.5em;
  }

  .incidentFilterPanel__controls svg,
  .incidentFilterPanel__type svg {
    color: grey;
    font-size: large;
    cursor: pointer;
  }

  .incidentFilterPanel__controls svg:hover,
  .incidentFilterPanel__type svg:hover {
    color: black;
  }

  .incidentFilterPanel__type svg.active {
    color: black;
  }
`;
