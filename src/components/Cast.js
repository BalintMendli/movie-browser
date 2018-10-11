import React from 'react';
import PropTypes from 'prop-types';
import { View, Mask, Fa, Container, Row, Col, Card, CardText } from 'mdbreact';
import SmallCards from './SmallCards';

const Cast = ({ data, type }) => (
  <Row className="flex-column justify-content-center align-items-center">
    <Col size="12" md="10" lg="8">
      <SmallCards data={data.credits.cast} type={type} />
    </Col>
  </Row>
);

Cast.propTypes = {};

export default Cast;
