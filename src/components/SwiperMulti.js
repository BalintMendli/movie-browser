import React from 'react';
import {
  Container,
  Card,
  CardBody,
  CardImage,
  CardText,
  CardTitle,
  Button,
} from 'mdbreact';
import Swiper from 'react-id-swiper';
import SwiperElem from './SwiperElem';

const SwiperMulti = ({ trending }) => {
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
      480: {
        slidesPerView: 2,
        spaceBetween: 20,
        slidesPerGroup: 2,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
      },
    },
  };
  return (
    <Container>
      <Swiper {...params}>
        {trending.map(x => (
          <div>
            <SwiperElem movie={x} />
          </div>
        ))}
      </Swiper>
    </Container>
  );
};

export default SwiperMulti;
