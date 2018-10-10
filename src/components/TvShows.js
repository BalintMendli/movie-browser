import React, { Component } from 'react';
import { Container, Row, Col } from 'mdbreact';
import axios from 'axios';
import { bg, hr } from './style.module.css';
import SwiperMulti from './SwiperMulti';
import SearchForm from './SearchForm';

const airingTodayUrl = 'https://api.themoviedb.org/3/tv/airing_today?api_key=';
const onTheAirUrl = 'https://api.themoviedb.org/3/tv/on_the_air?api_key=';
const popularUrl = 'https://api.themoviedb.org/3/tv/popular?api_key=';
const topRatedUrl = 'https://api.themoviedb.org/3/tv/top_rated?api_key=';
const API_KEY = process.env.REACT_APP_API_KEY;

export default class TvShows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airingToday: [],
      onTheAir: [],
      popular: [],
      topRated: [],
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    Promise.all([
      axios.get(airingTodayUrl + API_KEY),
      axios.get(onTheAirUrl + API_KEY),
      axios.get(popularUrl + API_KEY),
      axios.get(topRatedUrl + API_KEY),
    ])
      .then(response => {
        this.setState({
          airingToday: response[0].data.results,
          onTheAir: response[1].data.results,
          popular: response[2].data.results,
          topRated: response[3].data.results,
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
    const {
      airingToday,
      onTheAir,
      popular,
      topRated,
      isLoading,
      error,
    } = this.state;
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
