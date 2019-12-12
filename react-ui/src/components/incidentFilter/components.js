import styled from 'styled-components';

export const FilterContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 150px;
  max-width: 100%;

  border-right: none;

  z-index: 2000;

  @media (min-width: 800px) {
    left: 15px;
  }

  .content {
    padding: 10px;
    border: 1px solid lightgray;
    box-shadow: ${props => props.theme.shadows['shadow-200']};
    background-color: #ecf0f1;
    transition-duration: 0.195s;
    transition-timing-function: ease-out;
    z-index: 1999;
  }

  &.collapsed {
    height: 35px;

    .content {
      transform: translateY(-100%);
    }
  }

  .title {
    position: relative;
    display: block;
    width: 100%;
    height: 35px;
    z-index: 2001;
    border-bottom: none;
  }

  .title svg {
    margin-left: 1em;
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
