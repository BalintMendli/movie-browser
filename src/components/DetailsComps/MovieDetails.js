import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { View, Mask, Fa, Container, Row, Col, Tooltip } from 'mdbreact';
import { carImg } from '../Carousel/Carousel.module.css';
import {
  bg,
  posterImg,
  carText,
  amberStar,
  redHeart,
  cyanBM,
} from '../Style/style.module.css';
import Tabs from '../Misc/Tabs';
import Icons from '../Misc/Icons';

const API_KEY = process.env.REACT_APP_API_KEY;

export default class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: {},
      isLoading: true,
      error: null,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(movieId) {
    this.setState({ isLoading: true });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits,reviews,similar`
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

  componentDidMount() {
    const { match } = this.props;
    this.fetchData(match.params.movieId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.movieId !== prevProps.match.params.movieId) {
      this.fetchData(this.props.match.params.movieId);
    }
  }

  render() {
    const { movieDetails, isLoading, error } = this.state;
    const { match } = this.props;
    console.log(match);
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
            <div className={carText}>
              <h1 className="text-left font-weight-bold">
                {movieDetails.title}
              </h1>
              <h4>{movieDetails.tagline}</h4>
              <p>{movieDetails.genres.map(genre => genre.name).join(', ')}</p>
              <p className="text-left font-weight-bold">
                <Fa icon="star" className="amber-text pr-1" />
                {movieDetails.vote_average}
                <span style={{ fontSize: '12px', fontWeight: 'normal' }}>
                  /10{match.params.movieId}
                </span>
              </p>
            </div>
          </Mask>
        </View>
        <div className={bg}>
          <Container className="text-white">
            <Row>
              <Col md="4" className="text-center">
                <div className={posterImg}>
                  <img
                    src={`https://image.tmdb.org/t/p/w342${
                      movieDetails.poster_path
                    }`}
                    alt="poster"
                    className="img-fluid"
                  />
                  <Icons />
                </div>
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
