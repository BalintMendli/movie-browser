import React, { Component } from 'react';
import { Container, Row, Col } from 'mdbreact';
import { connect } from 'react-redux';
import { getUrls } from '../../utils/fetchData';
import { fetchLists } from '../../redux/actions';
import SwiperMulti from '../Swiper/SwiperMulti';
import SearchForm from '../Search/SearchForm';
import { bg, hr } from '../Style/style.module.css';

class Movies extends Component {
  componentDidMount() {
    const {
      popularMovie,
      topRatedMovie,
      nowPlayingMovie,
      upcomingMovie,
      fetchLists,
    } = this.props;
    const toFetch = getUrls({
      popularMovie,
      topRatedMovie,
      nowPlayingMovie,
      upcomingMovie,
    });
    if (Object.keys(toFetch).length) fetchLists(toFetch);
  }

  render() {
    const {
      popularMovie,
      topRatedMovie,
      nowPlayingMovie,
      upcomingMovie,
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
              <h2 className="mb-0">Now Playing</h2>
            </Col>
            <Col size="3">
              <SearchForm type="movie" />
            </Col>
          </Row>
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

const mapStateToProps = state => state.lists;

export default connect(
  mapStateToProps,
  { fetchLists }
)(Movies);
