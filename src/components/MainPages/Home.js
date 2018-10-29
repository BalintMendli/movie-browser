import React from 'react';
import CarouselComp from '../Carousel/Carousel';
import MainCont from './MainCont';

const Home = ({ nowPlaying, upcoming }) => (
  <>
    <CarouselComp nowPlaying={nowPlaying} />
    <MainCont upcoming={upcoming} />
  </>
);

export default Home;
