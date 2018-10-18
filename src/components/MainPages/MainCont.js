import React from 'react';
import { Col, Container, Row } from 'mdbreact';
import axios from 'axios';
import SwiperMulti from '../Swiper/SwiperMulti';
import SmallCards from '../Misc/SmallCards';
import { bg } from '../Style/style.module.css';

const popPersonUrl = 'https://api.themoviedb.org/3/person/popular?api_key=';
const API_KEY = process.env.REACT_APP_API_KEY;

class MainCont extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popPerson: [],
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    Promise.all([axios.get(popPersonUrl + API_KEY)])
      .then(response => {
        this.setState({
          popPerson: response[0].data.results,
          isLoading: false,
        });
        console.log(response[0].data.results);
      })
      .catch(error =>
        this.setState({
          error,
          isLoading: false,
        })
      );
  }

  render() {
    const { popPerson, isLoading, error } = this.state;
    const { upComing } = this.props;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <Container className="my-5 py-5 text-white">
        <Row>
          <Col md="8">
            <h2 className="mb-4">Upcoming Movies</h2>
            <SwiperMulti movies={upComing} isSmall />
          </Col>
          <Col md="4" className="pl-4">
            <h2>Spotlight Celebrities</h2>
            {popPerson
              .filter((x, i) => i <= 2)
              .map(x => (
                <SmallCards data={x} key={x.id} />
              ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MainCont;
