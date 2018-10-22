import React from 'react';
import PropTypes from 'prop-types';
import { Fa, Row, Col, Card, CardText, CardTitle } from 'mdbreact';
import { Link } from 'react-router-dom';
import defPosterBig from '../../media/default_poster_big.jpg';

const SearchResultsElem = ({ data }) => (
  <Link to={`/movie/${data.id}`}>
    <Card className="card-body mb-3">
      <Row>
        <Col
          md="4"
          className="d-flex justify-content-center align-items-center"
        >
          <img
            src={
              data.poster_path
                ? `https://image.tmdb.org/t/p/w154${data.poster_path}`
                : defPosterBig
            }
            alt="poster-pic"
          />
        </Col>
        <Col
          md="8"
          className="text-dark d-flex flex-column justify-content-between"
        >
          <CardTitle>{data.title}</CardTitle>
          <CardText className="text-dark">{data.overview}</CardText>
          <p className="text-left font-weight-bold mb-0">
            <Fa icon="star" className="amber-text pr-1" />
            {data.vote_average ? data.vote_average : '-'}
            <span style={{ fontSize: '12px', fontWeight: 'normal' }}>/10</span>
          </p>
        </Col>
      </Row>
    </Card>
  </Link>
);

SearchResultsElem.propTypes = {
  data: PropTypes.shape({ id: PropTypes.number }).isRequired,
};

export default SearchResultsElem;
