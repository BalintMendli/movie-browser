import React from 'react';
import PropTypes from 'prop-types';
import { View, Mask, Fa, Container, Row, Col, Card, CardText } from 'mdbreact';
import { Link } from 'react-router-dom';
import defProf from '../media/default_profile.jpg';

const SmallCards = ({ data }) => (
  <>
    {data.map(x => (
      <Link key={x.cast_id} to={`/people/${x.id}`}>
        <Card
          className="card-body"
          style={{ width: '22rem', marginTop: '1rem' }}
        >
          <Row>
            <Col size="4" className="text-center">
              <img
                src={
                  x.profile_path
                    ? `https://image.tmdb.org/t/p/w45${x.profile_path}`
                    : defProf
                }
                alt="profile-pic"
              />
            </Col>
            <Col size="8">
              <CardText className="text-dark">
                {x.name} as {x.character}
              </CardText>
            </Col>
          </Row>
        </Card>
      </Link>
    ))}
  </>
);

SmallCards.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SmallCards;
