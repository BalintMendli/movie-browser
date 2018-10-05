import React from 'react';
import { CarouselCaption, CarouselItem, View, Mask } from 'mdbreact';

const CarouselElem = ({ itemId, movies }) => (
  <CarouselItem itemId={itemId}>
    <View
      src={`https://image.tmdb.org/t/p/original${
        movies[itemId - 1].backdrop_path
      }`}
      className="car-img"
    >
      <Mask overlay="black-light" />
    </View>
    <CarouselCaption>
      <h3 className="h3-responsive text-left">{movies[itemId - 1].title}</h3>
      <p className="text-left">
        {`Average rating: ${movies[itemId - 1].vote_average}`}
      </p>
    </CarouselCaption>
  </CarouselItem>
);

export default CarouselElem;
