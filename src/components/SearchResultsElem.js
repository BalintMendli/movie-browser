import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, CardText, CardTitle } from 'mdbreact';
import { Link } from 'react-router-dom';
import defPoster from '../media/default_poster.jpg';

const SearchResultsElem = ({ data }) => (
  <Link to={`/movie/${data.id}`}>
    <Card className="card-body mb-3">
      <Row>
        <Col md="4" className="text-center">
          <img
            src={
              data.poster_path
                ? `https://image.tmdb.org/t/p/w154${data.poster_path}`
                : defPoster
            }
            alt="poster-pic"
          />
        </Col>
        <Col md="8">
          <CardTitle>{data.title}</CardTitle>
          <CardText className="text-dark">{data.overview}</CardText>
        </Col>
      </Row>
    </Card>
  </Link>
);

SearchResultsElem.propTypes = {};

export default SearchResultsElem;
