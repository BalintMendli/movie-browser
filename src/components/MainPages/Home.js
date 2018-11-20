import React from 'react';
import { connect } from 'react-redux';
import { getUrls } from '../../utils/fetchData';
import { fetchLists } from '../../redux/actions';
import CarouselComp from '../Carousel/Carousel';
import MainCont from './MainCont';

class Home extends React.Component {
  componentDidMount() {
    const {
      nowPlayingMovie,
      upcomingMovie,
      popularPerson,
      fetchLists,
    } = this.props;
    const toFetch = getUrls({ nowPlayingMovie, upcomingMovie, popularPerson });
    console.log(toFetch);
    if (Object.keys(toFetch).length) fetchLists(toFetch);
  }

  render() {
    const { nowPlayingMovie, upcomingMovie, popularPerson } = this.props;
    return (
      <>
        <CarouselComp nowPlayingMovie={nowPlayingMovie} />
        <MainCont upcomingMovie={upcomingMovie} popularPerson={popularPerson} />
      </>
    );
  }
}

const mapStateToProps = state => state.lists;

export default connect(
  mapStateToProps,
  { fetchLists }
)(Home);
