import React from 'react';
import { Carousel, CarouselInner } from 'mdbreact';
import CarouselElem from './CarouselElem';

const carouselLength = 10;

const CarouselComp = ({ nowPlaying }) => (
  <Carousel
    activeItem={1}
    length={carouselLength}
    showControls={false}
    showIndicators={false}
    className="z-depth-1"
  >
    <CarouselInner>
      {nowPlaying.map((x, i) => (
        <CarouselElem key={x.id} itemId={i + 1} movie={x} />
      ))}
    </CarouselInner>
  </Carousel>
);

export default CarouselComp;
