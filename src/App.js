import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import MovieDetails from './components/MovieDetails';
import TvDetails from './components/TvDetails';
import PeopleDetails from './components/PeopleDetails';
import Header from './components/Header';
import FooterComp from './components/Footer';
import Home from './components/Home';
import Movies from './components/Movies';
import TvShows from './components/TvShows';
import Profile from './components/Profile';

const nowPlayingUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=';
const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowPlaying: [],
      popular: [],
      topRated: [],
      upComing: [],
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    Promise.all([axios.get(nowPlayingUrl + API_KEY)])
      .then(response => {
        this.setState({
          nowPlaying: response[0].data.results,
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
    const { nowPlaying, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Home nowPlaying={nowPlaying} />}
          />
          <Route
            path="/movies"
            render={() => <Movies nowPlaying={nowPlaying} />}
          />
          <Route path="/tv-shows" render={() => <TvShows />} />
          <Route path="/profile" render={() => <Profile />} />
          <Route
            path="/movie/:movieId"
            render={({ match }) => <MovieDetails match={match} />}
          />
          <Route
            path="/tv/:movieId"
            render={({ match }) => <TvDetails match={match} />}
          />
          <Route
            path="/people/:personId"
            render={({ match }) => <PeopleDetails match={match} />}
          />
        </Switch>
        <FooterComp />
      </div>
    );
  }
}

export default App;
