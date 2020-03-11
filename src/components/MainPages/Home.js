import React from 'react';
import { connect } from 'react-redux';
import { fetchLists } from '../../redux/actions';
import CarouselComp from '../Carousel/Carousel';
import MainCont from './MainCont';
import Loading from '../Misc/Loading';

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
      loading,
      error,
    } = this.props;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (loading) {
      return <Loading />;
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
  lists: { nowPlayingMovie, upcomingMovie, popularPerson, loading, error },
}) => ({
  nowPlayingMovie,
  upcomingMovie,
  popularPerson,
  loading,
  error,
});

export default connect(mapStateToProps, { fetchLists })(Home);
