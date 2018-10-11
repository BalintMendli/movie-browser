import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { View, Mask, Fa, Container, Row, Col } from 'mdbreact';
import { carImg } from './Carousel.module.css';
import { bg, posterImg } from './style.module.css';
import Tabs from './Tabs';

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
    const { match } = this.props;
    this.setState({ isLoading: true });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          match.params.movieId
        }?api_key=${API_KEY}&&append_to_response=videos,credits,reviews,similar`
      )
      .then(response => {
        this.setState({ movieDetails: response.data, isLoading: false });
        console.log(response.data);
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
      <>
        <View
          src={`https://image.tmdb.org/t/p/original${
            movieDetails.backdrop_path
          }`}
          className={carImg}
        >
          <Mask
            overlay="black-light"
            className="d-flex justify-content-end p-5 flex-column text-white"
          >
            <h1 className="text-left font-weight-bold">{movieDetails.title}</h1>
            <h4>{movieDetails.tagline}</h4>
            <p>{movieDetails.genres.map(genre => genre.name).join(', ')}</p>
            <p className="text-left font-weight-bold">
              <Fa icon="star" className="amber-text pr-1" />
              {movieDetails.vote_average}
              <span style={{ fontSize: '12px', fontWeight: 'normal' }}>
                /10
              </span>
            </p>
          </Mask>
        </View>
        <div className={bg}>
          <Container className="text-white">
            <Row>
              <Col md="4" className="text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w342${
                    movieDetails.poster_path
                  }`}
                  alt="poster"
                  className={`img-fluid ${posterImg}`}
                />
              </Col>
              <Col md="8">
                <Container className="mt-5 mt-md-0">
                  <Row>
                    <Col md="12">
                      <Tabs
                        movieDetails={movieDetails}
                        tabs={[
                          'Overview',
                          'Cast',
                          'Videos',
                          'Reviews',
                          'Similar',
                        ]}
                        type="movie"
                      />
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      movieId: PropTypes.string,
    }),
  }).isRequired,
};
