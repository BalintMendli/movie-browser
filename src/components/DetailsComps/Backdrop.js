import React from 'react';
import { View, Mask, Fa } from 'mdbreact';
import PropTypes from 'prop-types';
import { carText } from '../Style/style.module.css';
import { carImg } from '../Carousel/Carousel.module.css';

export default function Backdrop({
  backdropPath,
  title,
  tagline,
  genres,
  voteAverage,
}) {
  return (
    <View
      src={`https://image.tmdb.org/t/p/original${backdropPath}`}
      className={carImg}
    >
      <Mask
        overlay="black-light"
        className="d-flex justify-content-end p-5 flex-column text-white"
      >
        <div className={carText}>
          <h1 className="text-left font-weight-bold">{title}</h1>
          {tagline && <h4>{tagline}</h4>}
          <p>{genres.map(genre => genre.name).join(', ')}</p>
          <p className="text-left font-weight-bold">
            <Fa icon="star" className="amber-text pr-1" />
            {voteAverage || '—'}
            <span style={{ fontSize: '12px', fontWeight: 'normal' }}>/10</span>
          </p>
        </div>
      </Mask>
    </View>
  );
}

Backdrop.propTypes = {
  backdropPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  voteAverage: PropTypes.number.isRequired,
};

Backdrop.defaultProps = {
  tagline: null,
};
