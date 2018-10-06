import React from 'react';
import { Container } from 'mdbreact';
import { bg, hr } from './style.module.css';
import SwiperMulti from './SwiperMulti';

const Movies = ({ nowPlaying, popular, topRated, upComing }) => (
  <div className={bg}>
    <Container className="text-white">
      <h2 className="mb-4">Now Playing</h2>
      <SwiperMulti movies={nowPlaying} />
      <hr className={`my-4 ${hr}`} />
      <h2 className="mb-4">Popular</h2>
      <SwiperMulti movies={popular} />
      <hr className={`my-4 ${hr}`} />
      <h2 className="mb-4">Top Rated</h2>
      <SwiperMulti movies={topRated} />
      <hr className={`my-4 ${hr}`} />
      <h2 className="mb-4">Upcoming</h2>
      <SwiperMulti movies={upComing} />
    </Container>
  </div>
);

export default Movies;
