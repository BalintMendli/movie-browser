import React from 'react';
import { CarouselCaption, CarouselItem, View, Mask, Fa } from 'mdbreact';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { carImg } from './Carousel.module.css';

const CarouselElem = ({ itemId, movie: { title, rating, bgPic, id } }) => (
  <CarouselItem itemId={itemId}>
    <View
      src={`https://image.tmdb.org/t/p/original${bgPic}`}
      className={carImg}
    >
      <Mask overlay="black-light" />
    </View>
    <CarouselCaption>
      <Link to={`/movie/${id}`}>
        <h3 className="h3-responsive text-left font-weight-bold">{title}</h3>
      </Link>
      <p className="text-left font-weight-bold">
        <Fa icon="star" className="amber-text pr-1" />
        {rating}
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
    rating: PropTypes.number,
    bgPic: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};
