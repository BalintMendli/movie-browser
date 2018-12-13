import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MovieDetails from './components/DetailsComps/MovieDetails';
import TvDetails from './components/DetailsComps/TvDetails';
import PeopleDetails from './components/DetailsComps/PersonDetails';
import Header from './components/Header/Header';
import FooterComp from './components/Footer/Footer';
import Home from './components/MainPages/Home';
import Movies from './components/MainPages/Movies';
import TvShows from './components/MainPages/TvShows';
import Profile from './components/Auth/Profile';
import SearchResults from './components/Search/SearchResults';
import LogIn from './components/Auth/LogIn';
import Auth from './components/Auth/Auth';
import PrivateRoute from './components/Auth/PrivateRoute';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/movies" component={Movies} />
          <Route path="/tv-shows" component={TvShows} />
          <Redirect exact strict from="/login/" to="/login" />
          <Route path="/login" exact component={LogIn} />
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <Route path="/login/auth" exact component={Auth} />
          <Route path="/movie/:mediaId" component={MovieDetails} />
          <Route path="/tv/:mediaId" component={TvDetails} />
          <Route path="/people/:mediaId" component={PeopleDetails} />
          <Route path="/results/:type/:query" component={SearchResults} />
        </Switch>
        <FooterComp />
      </div>
    );
  }
}

export default App;
