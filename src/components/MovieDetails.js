import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { View, Mask, Fa } from 'mdbreact';
import { carImg } from './Carousel.module.css';

const API_KEY = process.env.REACT_APP_API_KEY;

export default class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: {},
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.movieId
        }?api_key=${API_KEY}`
      )
      .then(response => {
        this.setState({ movieDetails: response.data, isLoading: false });
      })
      .catch(error =>
        this.setState({
          error,
          isLoading: false,
        })
      );
  }

  render() {
    const { movieDetails, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <View
        src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
        className={carImg}
      >
        <Mask
          overlay="black-light"
          className="d-flex justify-content-end p-5 flex-column text-white"
        >
          <h1 className="text-left font-weight-bold">{movieDetails.title}</h1>
          <h4>{movieDetails.tagline}</h4>
          <p>{movieDetails.genres.map(x => x.name).join(', ')}</p>
          <p className="text-left font-weight-bold">
            <Fa icon="star" className="amber-text pr-1" />
            {movieDetails.vote_average}
            <span style={{ fontSize: '12px', fontWeight: 'normal' }}>/10</span>
          </p>
        </Mask>
      </View>
    );
  }
}

MovieDetails.propTypes = {};
