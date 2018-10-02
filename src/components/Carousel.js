import React from 'react';
import {
  Carousel,
  CarouselCaption,
  CarouselInner,
  CarouselItem,
  View,
  Mask,
} from 'mdbreact';
import './Carousel.css';

const CarouselComp = props => (
  <Carousel
    activeItem={1}
    length={5}
    showControls={false}
    showIndicators={false}
    className="z-depth-1"
  >
    <CarouselInner>
      <CarouselItem itemId="1">
        <View
          src={`https://image.tmdb.org/t/p/original${
            props.trending[0].backdrop_path
          }`}
          className="car-img"
        >
          <Mask overlay="black-light" />
        </View>
        <CarouselCaption>
          <h3 className="h3-responsive text-left">{props.trending[0].title}</h3>
          <p className="text-left">
            Average rating: {props.trending[0].vote_average}
          </p>
        </CarouselCaption>
      </CarouselItem>
      <CarouselItem itemId="2">
        <View
          src={`https://image.tmdb.org/t/p/original${
            props.trending[1].backdrop_path
          }`}
          className="car-img"
        >
          <Mask overlay="black-strong" />
        </View>
        <CarouselCaption>
          <h3 className="h3-responsive text-left">{props.trending[1].title}</h3>
          <p className="text-left">
            Average rating: {props.trending[1].vote_average}
          </p>
        </CarouselCaption>
      </CarouselItem>
      <CarouselItem itemId="3">
        <View
          src={`https://image.tmdb.org/t/p/original${
            props.trending[2].backdrop_path
          }`}
          className="car-img"
        >
          <Mask overlay="black-slight" />
        </View>
        <CarouselCaption>
          <h3 className="h3-responsive text-left">{props.trending[2].title}</h3>
          <p className="text-left">
            Average rating: {props.trending[2].vote_average}
          </p>
        </CarouselCaption>
      </CarouselItem>
      <CarouselItem itemId="4">
        <View
          src={`https://image.tmdb.org/t/p/original${
            props.trending[3].backdrop_path
          }`}
          className="car-img"
        >
          <Mask overlay="black-light" />
        </View>
        <CarouselCaption>
          <h3 className="h3-responsive text-left">{props.trending[3].title}</h3>
          <p className="text-left">
            Average rating: {props.trending[3].vote_average}
          </p>
        </CarouselCaption>
      </CarouselItem>
      <CarouselItem itemId="5">
        <View
          src={`https://image.tmdb.org/t/p/original${
            props.trending[4].backdrop_path
            }`}
          className="car-img"
        >
          <Mask overlay="black-light" />
        </View>
        <CarouselCaption>
          <h3 className="h3-responsive text-left">{props.trending[4].title}</h3>
          <p className="text-left">
            Average rating: {props.trending[4].vote_average}
          </p>
        </CarouselCaption>
      </CarouselItem>
    </CarouselInner>
  </Carousel>
);

export default CarouselComp;
