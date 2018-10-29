import React from 'react';
import PropTypes from 'prop-types';
import { Card, Fa } from 'mdbreact';
import { Link } from 'react-router-dom';
import { card, image, ten } from './SwiperElem.module.css';

const SwiperElem = ({ movie: { id, pic, title, rating }, isTv }) => (
  <Link to={isTv ? `/tv/${id}` : `/movie/${id}`}>
    <Card className={`mb-2 text-white ${card}`}>
      <img
        className={`img-fluid card-img ${image}`}
        src={`https://image.tmdb.org/t/p/w300${pic}`}
        alt="movie-poster"
      />
      <div
        className="card-img-overlay d-flex flex-column justify-content-end"
        style={{ fontSize: '16px', fontWeight: 'bold' }}
      >
        <p className="card-title mb-1">{title}</p>
        <p className="card-text">
          <Fa icon="star" className="amber-text pr-1" />
          {rating || '-'}
          <span className={ten}>/10</span>
        </p>
      </div>
    </Card>
  </Link>
);

SwiperElem.propTypes = {
  isTv: PropTypes.bool,
  movie: PropTypes.shape({
    id: PropTypes.number,
    pic: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
};

SwiperElem.defaultProps = {
  isTv: false,
};

export default SwiperElem;
