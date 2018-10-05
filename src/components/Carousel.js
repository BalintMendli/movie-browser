import React from 'react';
import { Carousel, CarouselInner } from 'mdbreact';
import './Carousel.css';
import CarouselElem from './CarouselElem';

const carouselLength = 10;

const CarouselComp = ({ trending }) => {
  const items = [];
  for (let i = 0; i < carouselLength; i++) {
    items.push(<CarouselElem key={i} itemId={i + 1} movies={trending} />);
  }
  return (
    <Carousel
      activeItem={1}
      length={carouselLength}
      showControls={false}
      showIndicators={false}
      className="z-depth-1"
    >
      <CarouselInner>{items}</CarouselInner>
    </Carousel>
  );
};

export default CarouselComp;
