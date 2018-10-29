import React, { Component } from 'react';
import { Container, Row, Col } from 'mdbreact';
import { connect } from 'react-redux';
import { bg, hr } from '../Style/style.module.css';
import SwiperMulti from '../Swiper/SwiperMulti';
import SearchForm from '../Search/SearchForm';
import { fetchMovies } from '../../redux/actions/index';
import { needFetch } from '../../utils/fetchData';

class Movies extends Component {
  componentDidMount() {
    const { popular, topRated, nowPlaying, upcoming, fetchMovies } = this.props;
    const toFetch = needFetch({ popular, topRated, nowPlaying, upcoming });
    if (Object.keys(toFetch).length) fetchMovies(toFetch);
  }

  render() {
    const {
      popular,
      topRated,
      nowPlaying,
      upcoming,
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
          <SwiperMulti movies={nowPlaying} />
          <hr className={`my-4 ${hr}`} />
          <h2 className="mb-4">Popular</h2>
          <SwiperMulti movies={popular} />
          <hr className={`my-4 ${hr}`} />
          <h2 className="mb-4">Top Rated</h2>
          <SwiperMulti movies={topRated} />
          <hr className={`my-4 ${hr}`} />
          <h2 className="mb-4">Upcoming</h2>
          <SwiperMulti movies={upcoming} />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => state.movies;

export default connect(
  mapStateToProps,
  { fetchMovies }
)(Movies);
