import styled from 'styled-components';

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
