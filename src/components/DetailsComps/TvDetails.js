import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Mask, Fa, Container, Row, Col } from 'mdbreact';
import { fetchDetails } from '../../redux/actions';
import { carImg } from '../Carousel/Carousel.module.css';
import { bg, posterImg, carText } from '../Style/style.module.css';
import Tabs from '../Misc/Tabs';
import IconPanel from '../Misc/IconPanel';

class TvDetails extends Component {
  componentDidMount() {
    const { match, fetchDetails } = this.props;
    fetchDetails({ id: match.params.mediaId, mediaType: 'tv' });
  }

  componentDidUpdate(prevProps) {
    const { match, fetchDetails } = this.props;
    if (match.params.mediaId !== prevProps.match.params.mediaId) {
      fetchDetails({ id: match.params.mediaId, mediaType: 'tv' });
    }
  }

  render() {
    const { tvDetails, isLoading, error, match } = this.props;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading || !tvDetails) {
      return <p>Loading ...</p>;
    }

    return (
      <div>
        <View
          src={`https://image.tmdb.org/t/p/original${tvDetails.backdrop_path}`}
          className={carImg}
        >
          <Mask
            overlay="black-light"
            className="d-flex justify-content-end p-5 flex-column text-white"
          >
            <div className={carText}>
              <h1 className="text-left font-weight-bold">{tvDetails.name}</h1>
              <h4>{tvDetails.tagline}</h4>
              <p>{tvDetails.genres.map(genre => genre.name).join(', ')}</p>
              <p className="text-left font-weight-bold">
                <Fa icon="star" className="amber-text pr-1" />
                {tvDetails.vote_average}
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
                    src={`https://image.tmdb.org/t/p/w342${tvDetails.poster_path}`}
                    alt="poster"
                    className="img-fluid"
                  />
                  <IconPanel
                    mediaType="tv"
                    id={match.params.mediaId}
                    rating={tvDetails.account_states?.rating}
                    favorite={tvDetails.account_states?.favorite}
                    watchlist={tvDetails.account_states?.watchlist}
                  />
                </div>
              </Col>
              <Col md="8">
                <Container className="mt-5 mt-md-0">
                  <Row>
                    <Col md="12">
                      <Tabs
                        movieDetails={tvDetails}
                        tabs={[
                          'Overview',
                          'Cast',
                          'Videos',
                          'Reviews',
                          'Similar',
                        ]}
                        type="tv"
                      />
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

TvDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      movieId: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = ({ details, detailsIsLoading, detailsError }) => ({
  tvDetails: details.data,
  isLoading: detailsIsLoading.tv,
  error: detailsError,
});

export default connect(mapStateToProps, { fetchDetails })(TvDetails);
