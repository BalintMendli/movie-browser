import React from 'react';
import CarouselComp from '../Carousel/Carousel';
import MainCont from './MainCont';

class Home extends React.Component {
  componentDidMount() {
    const { nowPlaying, upcoming, popPerson } = this.props;
    const toFetch = getUrls({ nowPlaying, upcoming, popPerson });
    if (Object.keys(toFetch).length) fetchMovies(toFetch);
  }

  render() {
    return (
      <>
        <CarouselComp nowPlaying={this.props.nowPlaying} />
        <MainCont upcoming={this.props.upcoming} />
      </>
    );
  }
}

export default Home;
