import React from 'react';
import { Container, Row, Col } from 'mdbreact';
import PropTypes from 'prop-types';
import { bg, posterImg } from '../Style/style.module.css';
import IconPanel from '../Misc/IconPanel';
import Tabs from '../Misc/Tabs';
import defPoster from '../../media/default_poster_big.jpg';
import defProfile from '../../media/default_profile_big.png';
import { movieType, tvType, personType } from '../types';

export default function DetailsLower({ mediaType, data }) {
  const isPerson = mediaType === 'person';
  const tabs = isPerson
    ? ['Overview', 'Biography', 'Filmography']
    : ['Overview', 'Cast', 'Videos', 'Reviews', 'Similar'];
  const accountStates = data.account_states || {};
  let pic =
    data.poster_path || data.profile_path
      ? `https://image.tmdb.org/t/p/w342${data.poster_path ||
          data.profile_path}`
      : null;
  if (!pic) pic = isPerson ? defProfile : defPoster;

  return (
    <div className={bg}>
      <Container className="text-white">
        <Row>
          <Col md="4" className="text-center">
            <div className={posterImg}>
              <img src={pic} alt="poster" className="img-fluid" />
              {!isPerson && (
                <IconPanel
                  mediaType={mediaType}
                  id={data.id}
                  rated={accountStates.rated?.value}
                  favorite={accountStates.favorite}
                  watchlist={accountStates.watchlist}
                />
              )}
            </div>
          </Col>
          <Col md="8">
            <Container className="mt-5 mt-md-0">
              <Row>
                <Col md="12">
                  <Tabs details={data} tabs={tabs} type={mediaType} />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

DetailsLower.propTypes = {
  data: PropTypes.oneOfType([movieType, tvType, personType]).isRequired,
  mediaType: PropTypes.oneOf(['movie', 'tv', 'person']).isRequired,
};
