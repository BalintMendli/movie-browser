import React from 'react';
import { connect } from 'react-redux';
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
    fetchLists({ nowPlayingMovie, upcomingMovie, popularPerson });
  }

  render() {
    const {
      nowPlayingMovie,
      upcomingMovie,
      popularPerson,
      listsIsLoading,
      listsError,
    } = this.props;

    if (listsError) {
      return <p>{listsError.message}</p>;
    }

    if (listsIsLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <>
        <CarouselComp nowPlayingMovie={nowPlayingMovie} />
        <MainCont upcomingMovie={upcomingMovie} popularPerson={popularPerson} />
      </>
    );
  }
}

const mapStateToProps = ({
  lists: { nowPlayingMovie, upcomingMovie, popularPerson },
  listsIsLoading,
  listsError,
}) => ({
  nowPlayingMovie,
  upcomingMovie,
  popularPerson,
  listsIsLoading,
  listsError,
});

export default connect(
  mapStateToProps,
  { fetchLists }
)(Home);
