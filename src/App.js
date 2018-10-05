import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router';
import Header from './components/Header';
import FooterComp from './components/Footer';
import Home from './components/Home';
import Movies from './components/Movies';
import TvShows from './components/TvShows';
import Profile from './components/Profile';

const API = 'https://api.themoviedb.org/3/movie/now_playing?api_key=';
const DEFAULT_QUERY = '00022dd605aeb5a850c9dba38f57340e';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trending: [],
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get(API + DEFAULT_QUERY)
      .then(response => {
        this.setState({
          trending: response.data.results,
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
    const { trending, isLoading, error } = this.state;

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
          <Route exact path="/" render={() => <Home trending={trending} />} />
          <Route path="/movies" render={() => <Movies trending={trending} />} />
          <Route path="/tv-shows" render={() => <TvShows />} />
          <Route path="/profile" render={() => <Profile />} />
        </Switch>
        <FooterComp />
      </div>
    );
  }
}

export default App;
