import React from 'react';
import Swiper from 'react-id-swiper';
import PropTypes from 'prop-types';
import SwiperElem from './SwiperElem';

const params = {
  slidesPerView: 6,
  spaceBetween: 30,
  slidesPerGroup: 6,
  scrollbar: {
    el: '.swiper-scrollbar',
    hide: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
      slidesPerGroup: 1,
    },
    574: {
      slidesPerView: 2,
      spaceBetween: 20,
      slidesPerGroup: 2,
    },
    767: {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 3,
    },
    991: {
      slidesPerView: 4,
      spaceBetween: 30,
      slidesPerGroup: 4,
    },
    1199: {
      slidesPerView: 5,
      spaceBetween: 30,
      slidesPerGroup: 5,
    },
  },
};

const paramsSmall = {
  slidesPerView: 4,
  spaceBetween: 30,
  slidesPerGroup: 4,
  scrollbar: {
    el: '.swiper-scrollbar',
    hide: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
      slidesPerGroup: 1,
    },
    574: {
      slidesPerView: 2,
      spaceBetween: 20,
      slidesPerGroup: 2,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 3,
    },
  },
};

const SwiperMulti = ({ movies, isTv, isSmall }) => {
  const paramsToPass = isSmall ? paramsSmall : params;
  return (
    <Swiper {...paramsToPass}>
      {movies
        .filter(x => x.poster_path)
        .map(x => (
          <div key={x.id}>
            <SwiperElem movie={x} isTv={isTv} />
          </div>
        ))}
    </Swiper>
  );
};

SwiperMulti.propTypes = {
  isTv: PropTypes.bool,
  isSmall: PropTypes.bool,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SwiperMulti.defaultProps = {
  isTv: false,
  isSmall: false,
};

export default SwiperMulti;
