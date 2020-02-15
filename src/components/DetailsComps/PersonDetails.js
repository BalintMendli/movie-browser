import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardText, CardTitle } from 'mdbreact';
import { connect } from 'react-redux';
import { fetchDetails } from '../../redux/actions';
import defPoster from '../../media/default_poster.jpg';
import { bg, posterImg } from '../Style/style.module.css';
import Tabs from '../Misc/Tabs';

class PersonDetails extends Component {
  componentDidMount() {
    const { match, fetchDetails } = this.props;
    fetchDetails({ id: match.params.mediaId, mediaType: 'person' });
  }

  componentDidUpdate(prevProps) {
    const { match, fetchDetails } = this.props;
    if (match.params.mediaId !== prevProps.match.params.mediaId) {
      fetchDetails({ id: match.params.mediaId, mediaType: 'person' });
    }
  }

  render() {
    const { personDetails, isLoading, error } = this.props;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading || !personDetails) {
      return <p>Loading ...</p>;
    }

    return (
      <div className={bg}>
        <Container className="text-white">
          <Row>
            <Col md="4" className="text-center">
              <img
                src={`https://image.tmdb.org/t/p/w342${personDetails.profile_path}`}
                alt="poster"
                className={`img-fluid ${posterImg}`}
              />
            </Col>
            <Col md="8">
              <Container className="mt-5 mt-md-0">
                <Row>
                  <Col md="12">
                    <Tabs
                      movieDetails={personDetails}
                      tabs={['Overview', 'Biography', 'Filmography']}
                      type="person"
                    />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

PersonDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      movieId: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = ({ details, detailsIsLoading, detailsError }) => ({
  personDetails: details.data,
  isLoading: detailsIsLoading.person,
  error: detailsError,
});

export default connect(mapStateToProps, { fetchDetails })(PersonDetails);
