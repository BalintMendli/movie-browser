import React from 'react';
import { Col, Container, Row } from 'mdbreact';
import SwiperMulti from '../Swiper/SwiperMulti';
import SmallCards from '../Misc/SmallCards';

const MainCont = ({ popularPerson, upcomingMovie, isLoading, error }) => {
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
          <SwiperMulti movies={upcomingMovie} isSmall />
        </Col>
        <Col md="4" className="pl-4">
          <h2>Spotlight Celebrities</h2>
          {popularPerson
            .filter((_, i) => i <= 2)
            .map(x => (
              <SmallCards data={x} key={x.id} type="person" />
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MainCont;
