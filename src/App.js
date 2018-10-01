import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import CarouselComp from './components/Carousel';
import MainCont from './components/MainCont';
import FooterComp from './components/Footer';

const API = 'https://api.themoviedb.org/3/trending/movie/week?api_key=';
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
    const { hits, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div className="App">
        <Header />
        <CarouselComp trending={this.state.trending} />
        <MainCont />
        <FooterComp />
      </div>
    );
  }
}

export default App;
