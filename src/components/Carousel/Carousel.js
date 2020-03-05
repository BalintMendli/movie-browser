import React from 'react';
import { Carousel, CarouselInner } from 'mdbreact';
import PropTypes from 'prop-types';
import CarouselElem from './CarouselElem';

const carouselLength = 10;

const CarouselComp = ({ nowPlayingMovie }) => (
  <Carousel
    activeItem={1}
    length={carouselLength}
    showControls={false}
    showIndicators={false}
    onHoverStop={false}
    className="z-depth-1"
  >
    <CarouselInner>
      {nowPlayingMovie
        .filter((_, i) => i < carouselLength)
        .map((x, i) => (
          <CarouselElem key={x.id} itemId={i + 1} movie={x} />
        ))}
    </CarouselInner>
  </Carousel>
);

export default CarouselComp;

CarouselComp.propTypes = {
  nowPlayingMovie: PropTypes.arrayOf(PropTypes.object).isRequired,
};
