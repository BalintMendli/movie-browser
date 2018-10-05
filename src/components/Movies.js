import React from 'react';
import { Container } from 'mdbreact';
import './bg.css';
import SwiperMulti from './SwiperMulti';

const styles = { paddingTop: '100px' };

const Movies = ({ trending }) => (
  <div className="bg" style={styles}>
    <Container className="text-white">Movies</Container>
    <SwiperMulti trending={trending} />
  </div>
);

export default Movies;
