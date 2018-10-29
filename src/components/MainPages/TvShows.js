import React, { Component } from 'react';
import { Container, Row, Col } from 'mdbreact';
import { connect } from 'react-redux';
import { fetchTvShows } from '../../redux/actions';
import { getUrlsTvShows } from '../../utils/fetchData';
import SwiperMulti from '../Swiper/SwiperMulti';
import SearchForm from '../Search/SearchForm';
import { bg, hr } from '../Style/style.module.css';

class TvShows extends Component {
  componentDidMount() {
    const {
      airingToday,
      onTheAir,
      popular,
      topRated,
      fetchTvShows,
    } = this.props;
    const toFetch = getUrlsTvShows({
      popular,
      topRated,
      airingToday,
      onTheAir,
    });
    if (Object.keys(toFetch).length) fetchTvShows(toFetch);
  }

  render() {
    const {
      airingToday,
      onTheAir,
      popular,
      topRated,
      isLoading,
      error,
    } = this.props;
    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div className={bg}>
        <Container className="text-white">
          <Row>
            <Col size="9" className="d-flex align-items-center">
              <h2 className="mb-0">Airing Today</h2>
            </Col>
            <Col size="3">
              <SearchForm type="tv" />
            </Col>
          </Row>
          <SwiperMulti movies={airingToday} isTv />
          <hr className={`my-4 ${hr}`} />
          <h2 className="mb-4">On The Air</h2>
          <SwiperMulti movies={onTheAir} isTv />
          <hr className={`my-4 ${hr}`} />
          <h2 className="mb-4">Popular</h2>
          <SwiperMulti movies={popular} isTv />
          <hr className={`my-4 ${hr}`} />
          <h2 className="mb-4">Top Rated</h2>
          <SwiperMulti movies={topRated} isTv />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => state.tvShows;

export default connect(
  mapStateToProps,
  { fetchTvShows }
)(TvShows);
