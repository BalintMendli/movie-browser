import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router';
import Header from './components/Header';
import CarouselComp from './components/Carousel';
import MainCont from './components/MainCont';
import FooterComp from './components/Footer';

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
          <Route
            exact
            path="/"
            render={() => (
              <>
                <CarouselComp trending={trending} />
                <MainCont />
              </>
            )}
          />
          <Route path="/movies" render={() => <div>Movies</div>} />
          <Route path="/tv-shows" render={() => <div>TV Shows</div>} />
          <Route path="/profile" render={() => <div>Profile</div>} />
        </Switch>

        <FooterComp />
      </div>
    );
  }
}

export default App;
