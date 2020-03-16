import React, { Component } from 'react';
import { Container } from 'mdbreact';
import { connect } from 'react-redux';
import fetchLists from '../../redux/actions/fetchLists';
import SwiperMulti from '../Swiper/SwiperMulti';
import SearchForm from '../Search/SearchForm';
import { bg, hr } from '../Style/style.module.css';
import Loading from '../Misc/Loading';
import Error from '../Misc/Error';

class TvShows extends Component {
  componentDidMount() {
    const {
      airingTodayTv,
      onTheAirTv,
      popularTv,
      topRatedTv,
      fetchLists,
    } = this.props;
    fetchLists({
      popularTv,
      topRatedTv,
      airingTodayTv,
      onTheAirTv,
    });
  }

  render() {
    const {
      airingTodayTv,
      onTheAirTv,
      popularTv,
      topRatedTv,
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
            <h2 className="mb-4 mb-sm-0">Airing Today</h2>
            <div className="d-none d-sm-block">
              <SearchForm type="tv" />
            </div>
          </div>
          <SwiperMulti movies={airingTodayTv} isTv />
          <hr className={`my-4 ${hr}`} />
          <h2 className="mb-4">On The Air</h2>
          <SwiperMulti movies={onTheAirTv} isTv />
          <hr className={`my-4 ${hr}`} />
          <h2 className="mb-4">Popular</h2>
          <SwiperMulti movies={popularTv} isTv />
          <hr className={`my-4 ${hr}`} />
          <h2 className="mb-4">Top Rated</h2>
          <SwiperMulti movies={topRatedTv} isTv />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({
  lists: { airingTodayTv, onTheAirTv, popularTv, topRatedTv, loading, error },
}) => ({
  airingTodayTv,
  onTheAirTv,
  popularTv,
  topRatedTv,
  loading,
  error,
});

export default connect(mapStateToProps, { fetchLists })(TvShows);
