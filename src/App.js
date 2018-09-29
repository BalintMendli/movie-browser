import React, { Component } from 'react';
import Header from './components/Header';
import CarouselComp from './components/Carousel';
import MainCont from './components/MainCont';
import FooterComp from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <CarouselComp />
        <MainCont />
        <FooterComp />
      </div>
    );
  }
}

export default App;
