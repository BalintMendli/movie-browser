import React from 'react';
import CarouselComp from './Carousel';
import MainCont from './MainCont';

const Home = ({ nowPlaying }) => (
  <>
    <CarouselComp nowPlaying={nowPlaying} />
    <MainCont />
  </>
);

export default Home;
