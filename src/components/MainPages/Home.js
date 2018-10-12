import React from 'react';
import CarouselComp from '../Carousel/Carousel';
import MainCont from './MainCont';

const Home = ({ nowPlaying, upComing }) => (
  <>
    <CarouselComp nowPlaying={nowPlaying} />
    <MainCont upComing={upComing} />
  </>
);

export default Home;
