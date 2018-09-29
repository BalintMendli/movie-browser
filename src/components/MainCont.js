import React from 'react';
import { Col, Container, Row } from 'mdbreact';

class MainCont extends React.Component {
  render() {
    return (
      <Container className="mt-4">
        <Row>
          <Col className="text-center">valami</Col>
          <Col className="text-center">valami2</Col>
        </Row>
      </Container>
    );
  }
}

export default MainCont;
