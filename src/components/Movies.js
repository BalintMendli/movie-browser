import React, { Component } from 'react';
import { Container } from 'mdbreact';
import axios from 'axios';
import { bg, hr } from './style.module.css';
import SwiperMulti from './SwiperMulti';

const popularUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=';
const topRatedUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key=';
const upComingUrl = 'https://api.themoviedb.org/3/movie/upcoming?api_key=';
const API_KEY = process.env.REACT_APP_API_KEY;

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popular: [],
      topRated: [],
      upComing: [],
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    Promise.all([
      axios.get(popularUrl + API_KEY),
      axios.get(topRatedUrl + API_KEY),
      axios.get(upComingUrl + API_KEY),
    ])
      .then(response => {
        this.setState({
          popular: response[0].data.results,
          topRated: response[1].data.results,
          upComing: response[2].data.results,
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
    const { upComing, popular, topRated, isLoading, error } = this.state;
    const { nowPlaying } = this.props;
    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div className={bg}>
        <Container className="text-white">
          <h2 className="mb-4">Now Playing</h2>
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
