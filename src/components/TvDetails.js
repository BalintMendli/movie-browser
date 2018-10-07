import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { View, Mask, Fa, Container, Row, Col } from 'mdbreact';
import { carImg } from './Carousel.module.css';
import { bg } from './style.module.css';

const API_KEY = process.env.REACT_APP_API_KEY;

export default class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: {},
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
        `https://api.themoviedb.org/3/tv/${
          this.props.match.params.movieId
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

  toggle(e) {
    e.preventDefault();
    if (this.state.activeItem !== e.target.dataset.tab) {
      this.setState({
        activeItem: e.target.dataset.tab,
      });
    }
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
      <div>
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
          <div className="container text-white">
            <div className="row">
              <div className="col-4">
                <img
                  src={`https://image.tmdb.org/t/p/w342${
                    movieDetails.poster_path
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
                        <div
                          className="nav nav-tabs"
                          id="nav-tab"
                          role="tablist"
                        >
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
                            id="nav-cast-tab"
                            data-toggle="tab"
                            data-tab="2"
                            href="#cast"
                            role="tab"
                            aria-controls="nav-cast"
                            aria-selected="false"
                            onClick={this.toggle}
                          >
                            Cast
                          </a>
                          <a
                            className={`nav-item nav-link${
                              this.state.activeItem === '3' ? ' active' : ''
                            }`}
                            id="nav-videos-tab"
                            data-toggle="tab"
                            data-tab="3"
                            href="#videos"
                            role="tab"
                            aria-controls="nav-videos"
                            aria-selected="false"
                            onClick={this.toggle}
                          >
                            Videos
                          </a>
                          <a
                            className={`nav-item nav-link${
                              this.state.activeItem === '4' ? ' active' : ''
                            }`}
                            id="nav-reviews-tab"
                            data-toggle="tab"
                            data-tab="4"
                            href="#reviews"
                            role="tab"
                            aria-controls="nav-reviews"
                            aria-selected="false"
                            onClick={this.toggle}
                          >
                            Reviews
                          </a>
                          <a
                            className={`nav-item nav-link${
                              this.state.activeItem === '5' ? ' active' : ''
                            }`}
                            id="nav-similar-tab"
                            data-toggle="tab"
                            data-tab="5"
                            href="#similar"
                            role="tab"
                            aria-controls="nav-similar"
                            aria-selected="false"
                            onClick={this.toggle}
                          >
                            Similar
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
                          <h4>Release Date</h4>
                          <p>{this.state.movieDetails.release_date}</p>
                          <h4>Runtime</h4>
                          <p>{`${this.state.movieDetails.episode_run_time[0]} min`}</p>
                          <h4>Summary</h4>
                          <p>{this.state.movieDetails.overview}</p>
                        </div>
                        <div
                          className={`tab-pane fade${
                            this.state.activeItem === '2' ? ' show active' : ''
                          }`}
                          id="nav-cast"
                          role="tabpanel"
                          aria-labelledby="nav-cast-tab"
                        >
                          {this.state.movieDetails.credits.cast.map(x => (
                            <h5 key={x.cast_id}>
                              {x.character} -
{x.name}
                            </h5>
                          ))}
                        </div>
                        <div
                          className={`tab-pane fade${
                            this.state.activeItem === '3' ? ' show active' : ''
                          }`}
                          id="nav-trailers"
                          role="tabpanel"
                          aria-labelledby="nav-trailers-tab"
                        >
                          {this.state.movieDetails.videos.results
                            .filter(x => x.site === 'YouTube')
                            .map(x => (
                              <iframe
                                key={x.id}
                                id="ytplayer"
                                type="text/html"
                                width="640"
                                height="360"
                                src={`https://www.youtube.com/embed/${x.key}`}
                                frameBorder="0"
                              />
                            ))}
                        </div>
                        <div
                          className={`tab-pane fade${
                            this.state.activeItem === '4' ? ' show active' : ''
                          }`}
                          id="nav-reviews"
                          role="tabpanel"
                          aria-labelledby="nav-reviews-tab"
                        >
                          {this.state.movieDetails.reviews.results.map(x => (
                            <div key={x.id}>
                              <h5>{x.author}</h5>
                              <p>{x.content}</p>
                            </div>
                          ))}
                        </div>
                        <div
                          className={`tab-pane fade${
                            this.state.activeItem === '5' ? ' show active' : ''
                          }`}
                          id="nav-similar"
                          role="tabpanel"
                          aria-labelledby="nav-similar-tab"
                        >
                          {this.state.movieDetails.similar.results.map(x => (
                            <div key={x.id}>{x.name}</div>
                          ))}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MovieDetails.propTypes = {};
