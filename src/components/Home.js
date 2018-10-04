import React from 'react';
import CarouselComp from './Carousel';
import MainCont from './MainCont';

const Home = ({ trending }) => (
  <>
    <CarouselComp trending={trending} />
    <MainCont />
  </>
);

export default Home;
