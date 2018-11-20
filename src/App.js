import React, { Component } from 'react';
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

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/movies" component={Movies} />
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
