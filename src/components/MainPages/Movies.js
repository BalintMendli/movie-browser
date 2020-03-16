import React, { Component } from 'react';
import { Container } from 'mdbreact';
import { connect } from 'react-redux';
import fetchLists from '../../redux/actions/fetchLists';
import SwiperMulti from '../Swiper/SwiperMulti';
import SearchForm from '../Search/SearchForm';
import { bg, hr } from '../Style/style.module.css';
import Loading from '../Misc/Loading';
import Error from '../Misc/Error';

class Movies extends Component {
  componentDidMount() {
    const {
      popularMovie,
      topRatedMovie,
      nowPlayingMovie,
      upcomingMovie,
      fetchLists,
    } = this.props;
    fetchLists({
      popularMovie,
      topRatedMovie,
      nowPlayingMovie,
      upcomingMovie,
    });
  }

  render() {
    const {
      popularMovie,
      topRatedMovie,
      nowPlayingMovie,
      upcomingMovie,
      loading,
      error,
    } = this.props;

    if (error) {
      return <Error />;
    }

    if (loading) {
      return <Loading />;
    }

    return (
      <div className={bg}>
        <Container className="text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-4 mb-sm-0">Now Playing</h2>
            <div className="d-none d-sm-block">
              <SearchForm type="movie" />
            </div>
          </div>
          <SwiperMulti movies={nowPlayingMovie} />
          <hr className={`my-4 ${hr}`} />
          <h2 className="mb-4">Popular</h2>
          <SwiperMulti movies={popularMovie} />
          <hr className={`my-4 ${hr}`} />
          <h2 className="mb-4">Top Rated</h2>
          <SwiperMulti movies={topRatedMovie} />
          <hr className={`my-4 ${hr}`} />
          <h2 className="mb-4">Upcoming</h2>
          <SwiperMulti movies={upcomingMovie} />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({
  lists: {
    popularMovie,
    topRatedMovie,
    nowPlayingMovie,
    upcomingMovie,
    loading,
    error,
  },
}) => ({
  popularMovie,
  topRatedMovie,
  nowPlayingMovie,
  upcomingMovie,
  loading,
  error,
});

export default connect(mapStateToProps, { fetchLists })(Movies);
