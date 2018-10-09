import React from 'react';
import { CarouselCaption, CarouselItem, View, Mask, Fa } from 'mdbreact';
import PropTypes from 'prop-types';
import { carImg } from './Carousel.module.css';

const CarouselElem = ({ itemId, movie }) => (
  <CarouselItem itemId={itemId}>
    <View
      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
      className={carImg}
    >
      <Mask overlay="black-light" />
    </View>
    <CarouselCaption>
      <h3 className="h3-responsive text-left font-weight-bold">
        {movie.title}
      </h3>
      <p className="text-left font-weight-bold">
        <Fa icon="star" className="amber-text pr-1" />
        {movie.vote_average}
        <span style={{ fontSize: '12px', fontWeight: 'normal' }}>/10</span>
      </p>
    </CarouselCaption>
  </CarouselItem>
);

export default CarouselElem;

CarouselElem.propTypes = {
  itemId: PropTypes.number.isRequired,
  movie: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    backdrop_path: PropTypes.string,
  }).isRequired,
};
