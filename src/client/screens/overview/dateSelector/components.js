import styled from 'styled-components';

export const DateSelectorContainer = styled.div`
  width: 100%;
  position: absolute;
  left: 0%;

  .slick-slider {
    margin: 0 auto;
    width: 250px;
    background: white;
    color: black;
    box-shadow: -2px 2px 5px -2px rgba(0, 0, 0, 0.8);
  }

  .slick-slide {
  }

  .slick-slide.slick-current {
  }

  .slick-next:before,
  .slick-prev:before {
    color: #000;
  }
`;

export const DateSlide = styled.div`
  width: 250px;
  text-align: center;
`;
