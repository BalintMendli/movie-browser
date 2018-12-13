import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Mask, Fa, Container, Row, Col } from 'mdbreact';
import { fetchDetails } from '../../redux/actions';
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

class MovieDetails extends Component {
  componentDidMount() {
    const { match, fetchDetails } = this.props;
    fetchDetails({ id: match.params.mediaId, mediaType: 'movie' });
  }

  componentDidUpdate(prevProps) {
    const { match, fetchDetails } = this.props;
    if (match.params.mediaId !== prevProps.match.params.mediaId) {
      fetchDetails({ id: match.params.mediaId, mediaType: 'movie' });
    }
  }

  render() {
    const { movieDetails, isLoading, error } = this.props;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading || !movieDetails) {
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
                  /10
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

const mapStateToProps = ({ details, detailsIsLoading, detailsError }) => ({
  movieDetails: details.movie,
  isLoading: detailsIsLoading.movie,
  error: detailsError,
});

export default connect(
  mapStateToProps,
  { fetchDetails }
)(MovieDetails);
