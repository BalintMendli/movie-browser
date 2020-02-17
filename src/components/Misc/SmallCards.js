import React from 'react';
import PropTypes from 'prop-types';
import { Fa, Row, Col, Card, CardText, CardTitle } from 'mdbreact';
import { Link } from 'react-router-dom';
import defProf from '../../media/default_profile.jpg';
import defPoster from '../../media/default_poster.jpg';
import { ellipsis } from '../Style/style.module.css';

const SmallCards = ({ data, type, page }) => {
  if (page === 'filmography' || page === 'similar' || page === 'profile') {
    let cardText = '';
    if (page === 'filmography') {
      cardText = data.character ? `as ${data.character}` : '-';
    }
    if (page === 'similar' || page === 'profile') {
      cardText = data.overview;
    }
    return (
      <>
        <Link to={type === 'movie' ? `/movie/${data.id}` : `/tv/${data.id}`}>
          <Card className="card-body mb-2">
            <Row>
              <Col size="4" className="text-center">
                <img
                  src={
                    data.poster_path
                      ? `https://image.tmdb.org/t/p/w92${data.poster_path}`
                      : defPoster
                  }
                  alt="poster"
                />
              </Col>
              <Col
                size="8"
                className="text-dark d-flex flex-column justify-content-between pr-4"
              >
                <CardTitle>{data.title || data.name}</CardTitle>
                <CardText className={ellipsis}>{cardText}</CardText>
                <p className="text-left font-weight-bold mb-0">
                  <Fa icon="star" className="amber-text pr-1" />
                  {data.vote_average}
                  <span style={{ fontSize: '12px', fontWeight: 'normal' }}>
                    /10
                  </span>
                </p>
              </Col>
            </Row>
          </Card>
        </Link>
      </>
    );
  }
  if (type === 'character') {
    return (
      <Link to={`/person/${data.id}`}>
        <Card className="card-body mb-2">
          <Row>
            <Col size="4" className="text-center">
              <img
                src={
                  data.profile_path
                    ? `https://image.tmdb.org/t/p/w45${data.profile_path}`
                    : defProf
                }
                alt="profile-pic"
              />
            </Col>
            <Col
              size="8"
              className="d-flex justify-content-center align-items-center text-center pr-4"
            >
              <CardText className="text-dark">
                <strong>{data.name}</strong>
                <br />
                as {data.character}
              </CardText>
            </Col>
          </Row>
        </Card>
      </Link>
    );
  }
  if (type === 'person') {
    return (
      <Link to={`/person/${data.id}`}>
        <Card className="card-body mb-2">
          <Row>
            <Col size="4" className="text-center">
              <img
                src={
                  data.pic
                    ? `https://image.tmdb.org/t/p/w45${data.pic}`
                    : defProf
                }
                alt="profile-pic"
              />
            </Col>
            <Col
              size="8"
              className="d-flex justify-content-center align-items-center text-center pr-4"
            >
              <CardText className="text-dark">
                <strong>{data.name}</strong>
                <br />
                {data.knownFor.title || data.knownFor.name}
              </CardText>
            </Col>
          </Row>
        </Card>
      </Link>
    );
  }
};

SmallCards.propTypes = {
  data: PropTypes.shape({ id: PropTypes.number }).isRequired,
  type: PropTypes.string,
};

SmallCards.defaultProps = {
  type: 'person',
};

export default SmallCards;
