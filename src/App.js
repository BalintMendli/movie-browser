import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch, Redirect } from 'react-router-dom';
import MovieDetails from './components/DetailsComps/MovieDetails';
import TvDetails from './components/DetailsComps/TvDetails';
import PeopleDetails from './components/DetailsComps/PeopleDetails';
import Header from './components/Header/Header';
import FooterComp from './components/Footer/Footer';
import Home from './components/MainPages/Home';
import Movies from './components/MainPages/Movies';
import TvShows from './components/MainPages/TvShows';
import Profile from './components/Auth/Profile';
import SearchResults from './components/Search/SearchResults';
import LogIn from './components/Auth/LogIn';
import Auth from './components/Auth/Auth';

const nowPlayingUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=';
const upComingUrl = 'https://api.themoviedb.org/3/movie/upcoming?api_key=';
const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowPlaying: [],
      upComing: [],
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    Promise.all([
      axios.get(nowPlayingUrl + API_KEY),
      axios.get(upComingUrl + API_KEY),
    ])
      .then(response => {
        this.setState({
          nowPlaying: response[0].data.results,
          upComing: response[1].data.results,
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
    const { nowPlaying, upComing, isLoading, error } = this.state;

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
            render={() => <Home nowPlaying={nowPlaying} upComing={upComing} />}
          />
          <Route
            path="/movies"
            render={() => (
              <Movies nowPlaying={nowPlaying} upComing={upComing} />
            )}
          />
          <Route path="/tv-shows" render={() => <TvShows />} />
          <Redirect exact strict from="/login/" to="/login" />
          <Route path="/login" exact render={() => <LogIn />} />
          <Route path="/login/auth" exact component={Auth} />
          <Route
            path="/profile"
            render={() =>
              localStorage.getItem('session_id') ||
              localStorage.getItem('guest_session_id') ? (
                <Profile />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route path="/movie/:movieId" component={MovieDetails} />
          <Route path="/tv/:movieId" component={TvDetails} />
          <Route path="/people/:personId" component={PeopleDetails} />
          <Route path="/results/:type/:query" component={SearchResults} />
        </Switch>
        <FooterComp />
      </div>
    );
  }
}

export default App;
