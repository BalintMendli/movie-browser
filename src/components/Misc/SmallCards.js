import React from 'react';
import PropTypes from 'prop-types';
import { View, Mask, Fa, Container, Row, Col, Card, CardText } from 'mdbreact';
import { Link } from 'react-router-dom';
import defProf from '../../media/default_profile.jpg';

const SmallCards = ({ data, type }) => (
  <Link to={`/people/${data.id}`}>
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
        <Col size="8">
          <CardText className="text-dark">
            {data.name} as {data.character}
          </CardText>
        </Col>
      </Row>
    </Card>
  </Link>
);

SmallCards.propTypes = {
  data: PropTypes.shape({ id: PropTypes.number }).isRequired,
};

export default SmallCards;
