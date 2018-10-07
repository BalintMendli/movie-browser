import React from 'react';
import PropTypes from 'prop-types';
import { Card, Fa } from 'mdbreact';
import { Link } from 'react-router-dom';
import { card, image } from './SwiperElem.module.css';

const SwiperElem = ({ movie, isTv }) => (
  <Link to={isTv ? `/tv/${movie.id}` : `/movie/${movie.id}`}>
    <Card className={`mb-2 text-white ${card}`}>
      <img
        className={`img-fluid card-img ${image}`}
        src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
        alt="movie-poster"
      />
      <div
        className="card-img-overlay d-flex flex-column justify-content-end"
        style={{ fontSize: '16px', fontWeight: 'bold' }}
      >
        <p className="card-title mb-1">{isTv ? movie.name : movie.title}</p>
        <p className="card-text">
          <Fa icon="star" className="amber-text pr-1" />
          {movie.vote_average ? movie.vote_average : '-'}
          <span style={{ fontSize: '12px', fontWeight: 'normal' }}>/10</span>
        </p>
      </div>
    </Card>
  </Link>
);

SwiperElem.propTypes = {};

export default SwiperElem;
