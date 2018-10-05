import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardImage,
  CardText,
  CardTitle,
  Button,
  Fa,
  View,
  Mask,
} from 'mdbreact';

const SwiperElem = ({ movie }) => (
  <Card className="mb-2 text-white" style={{ cursor: 'pointer' }}>
    <View>
      <img
        className="img-fluid card-img"
        src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
      />
      <Mask overlay="grey-light" />
    </View>
    <div
      className="card-img-overlay d-flex flex-column justify-content-end"
      style={{ fontSize: '16px', fontWeight: 'bold' }}
    >
      <p className="card-title mb-1">{movie.title}</p>
      <p className="card-text">
        <Fa icon="star" className="amber-text pr-1" />
        {movie.vote_average}
        <span style={{ fontSize: '12px', fontWeight: 'normal' }}>/10</span>
      </p>
    </div>
  </Card>
);

SwiperElem.propTypes = {};

export default SwiperElem;
