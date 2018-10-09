import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, CardText, CardTitle } from 'mdbreact';
import defPoster from '../media/default_poster.jpg';
import { bg, posterImg } from './style.module.css';
import Tabs from './Tabs';

const API_KEY = process.env.REACT_APP_API_KEY;

export default class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personDetails: {},
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    this.setState({ isLoading: true });
    axios
      .get(
        `https://api.themoviedb.org/3/person/${
          match.params.personId
        }?api_key=${API_KEY}&&append_to_response=combined_credits`
      )
      .then(response => {
        this.setState({ personDetails: response.data, isLoading: false });
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
    const { personDetails, isLoading, error } = this.state;

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
            <Col md="4" className="text-center">
              <img
                src={`https://image.tmdb.org/t/p/w342${
                  personDetails.profile_path
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

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      movieId: PropTypes.string,
    }),
  }).isRequired,
};
