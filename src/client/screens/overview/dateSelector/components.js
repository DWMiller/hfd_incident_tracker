import styled from 'styled-components';

export const DateSelectorContainer = styled.div`
  width: 100%;
  position: absolute;
  left: 0%;
  top: 5px;

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

  .slick-next,
  .slick-prev {
    height: 40px;
    width: 40px;
  }

  .slick-next:before,
  .slick-prev:before {
    color: #000;
    font-size: 30px;
    line-height: 1.5;
  }

  .slick-prev {
    left: -50px;
  }

  .slick-next {
    right: -50px;
  }
`;

export const DateSlide = styled.div`
  width: 250px;
  height: 40px;
  line-height: 40px;
  text-align: center;
`;
