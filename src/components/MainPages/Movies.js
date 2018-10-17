import React, { Component } from 'react';
import { Container, Row, Col } from 'mdbreact';
import axios from 'axios';
import { bg, hr } from '../Style/style.module.css';
import SwiperMulti from '../Swiper/SwiperMulti';
import SearchForm from '../Search/SearchForm';

const popularUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=';
const topRatedUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key=';
const API_KEY = process.env.REACT_APP_API_KEY;

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popular: [],
      topRated: [],
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    Promise.all([
      axios.get(popularUrl + API_KEY),
      axios.get(topRatedUrl + API_KEY),
    ])
      .then(response => {
        this.setState({
          popular: response[0].data.results,
          topRated: response[1].data.results,
          isLoading: false,
        });
      })
      .catch(error =>
        this.setState({
          error,
          isLoading: false,
        })
      );
  }

  render() {
    const { popular, topRated, isLoading, error } = this.state;
    const { nowPlaying, upComing } = this.props;
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
          <SwiperMulti movies={upComing} />
        </Container>
      </div>
    );
  }
}
