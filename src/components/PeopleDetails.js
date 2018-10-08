import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, CardText, CardTitle } from 'mdbreact';
import defPoster from '../media/default_poster.jpg';
import { bg } from './style.module.css';

const API_KEY = process.env.REACT_APP_API_KEY;

export default class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personDetails: {},
      isLoading: true,
      error: null,
      activeItem: '1',
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get(
        `https://api.themoviedb.org/3/person/${
          this.props.match.params.personId
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

  toggle(e) {
    e.preventDefault();
    if (this.state.activeItem !== e.target.dataset.tab) {
      this.setState({
        activeItem: e.target.dataset.tab,
      });
    }
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
        <div className="container text-white">
          <div className="row">
            <div className="col-4">
              <img
                src={`https://image.tmdb.org/t/p/w342${
                  personDetails.profile_path
                }`}
                alt="poster"
                className="img-fluid"
              />
            </div>
            <div className="col-8">
              <Container className="mt-4">
                <Row>
                  <Col md="12">
                    <nav>
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a
                          className={`nav-item nav-link${
                            this.state.activeItem === '1' ? ' active' : ''
                          }`}
                          id="nav-overview-tab"
                          data-toggle="tab"
                          data-tab="1"
                          href="#overview"
                          role="tab"
                          aria-controls="nav-overview"
                          aria-selected="true"
                          onClick={this.toggle}
                        >
                          Overview
                        </a>
                        <a
                          className={`nav-item nav-link${
                            this.state.activeItem === '2' ? ' active' : ''
                          }`}
                          id="nav-biography-tab"
                          data-toggle="tab"
                          data-tab="2"
                          href="#biography"
                          role="tab"
                          aria-controls="nav-biography"
                          aria-selected="false"
                          onClick={this.toggle}
                        >
                          Biography
                        </a>
                        <a
                          className={`nav-item nav-link${
                            this.state.activeItem === '3' ? ' active' : ''
                          }`}
                          id="nav-filmography-tab"
                          data-toggle="tab"
                          data-tab="3"
                          href="#filmography"
                          role="tab"
                          aria-controls="nav-filmography"
                          aria-selected="false"
                          onClick={this.toggle}
                        >
                          Filmography
                        </a>
                      </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                      <div
                        className={`tab-pane fade${
                          this.state.activeItem === '1' ? ' show active' : ''
                        }`}
                        id="nav-overview"
                        role="tabpanel"
                        aria-labelledby="nav-overview-tab"
                      >
                        <h4>Name</h4>
                        <p>{this.state.personDetails.name}</p>
                        <h4>Gender</h4>
                        <p>
                          {this.state.personDetails.gender === 1
                            ? 'Female'
                            : this.state.personDetails.gender === 2
                            ? 'Male'
                            : '-'}
                        </p>
                        <h4>Birthday</h4>
                        <p>{this.state.personDetails.birthday}</p>
                        <h4>Place of Birth</h4>
                        <p>{this.state.personDetails.place_of_birth}</p>
                        {this.state.personDetails.deathday && (
                          <>
                            <h4>Died</h4>
                            <p>{this.state.personDetails.deathday}</p>
                          </>
                        )}
                        {this.state.personDetails.homepage && (
                          <>
                            <h4>Official Site</h4>
                            <p>
                              <a
                                href={this.state.personDetails.homepage}
                                target="_blank"
                              >
                                {this.state.personDetails.homepage}
                              </a>
                            </p>
                          </>
                        )}
                      </div>
                      <div
                        className={`tab-pane fade${
                          this.state.activeItem === '2' ? ' show active' : ''
                        }`}
                        id="nav-biography"
                        role="tabpanel"
                        aria-labelledby="nav-biography-tab"
                      >
                        <h4>Biography</h4>
                        <p>{this.state.personDetails.biography}</p>
                      </div>
                      <div
                        className={`tab-pane fade${
                          this.state.activeItem === '3' ? ' show active' : ''
                        }`}
                        id="nav-filmography"
                        role="tabpanel"
                        aria-labelledby="nav-filmography-tab"
                      >
                        {this.state.personDetails.combined_credits.cast.map(
                          x => (
                            <Link
                              key={x.credit_id}
                              to={
                                x.media_type === 'movie'
                                  ? `/movie/${x.id}`
                                  : `/tv/${x.id}`
                              }
                            >
                              <Card
                                className="card-body"
                                style={{ width: '22rem', marginTop: '1rem' }}
                              >
                                <Row>
                                  <Col size="4" className="text-center">
                                    <img
                                      src={
                                        x.poster_path
                                          ? `https://image.tmdb.org/t/p/w92${
                                              x.poster_path
                                            }`
                                          : defPoster
                                      }
                                      alt="poster"
                                    />
                                  </Col>
                                  <Col size="8">
                                    <CardTitle className="text-dark">
                                      {x.title}
                                    </CardTitle>
                                    <CardText className="text-dark">
                                      {x.character}
                                    </CardText>
                                  </Col>
                                </Row>
                              </Card>
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MovieDetails.propTypes = {};
