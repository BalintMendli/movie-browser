import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardText, CardTitle } from 'mdbreact';
import defPoster from '../media/default_poster.jpg';

const Filmography = ({ data }) => (
  <>
    {data.combined_credits.cast.map(x => (
      <Link
        key={x.credit_id}
        to={x.media_type === 'movie' ? `/movie/${x.id}` : `/tv/${x.id}`}
      >
        <Card
          className="card-body"
          style={{ width: '22rem', marginTop: '1rem' }}
        >
          <Row>
            <Col size="4" className="text-center">
              <img
                src={
                  x.poster_path
                    ? `https://image.tmdb.org/t/p/w92${x.poster_path}`
                    : defPoster
                }
                alt="poster"
              />
            </Col>
            <Col size="8">
              <CardTitle className="text-dark">{x.title}</CardTitle>
              <CardText className="text-dark">{x.character}</CardText>
            </Col>
          </Row>
        </Card>
      </Link>
    ))}
  </>
);

Filmography.propTypes = {};

export default Filmography;
