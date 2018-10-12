import React from 'react';
import PropTypes from 'prop-types';

const Videos = ({ data }) => (
  <>
    {data.videos.results
      .filter(x => x.site === 'YouTube')
      .map(x => (
        <iframe
          key={x.id}
          id="ytplayer"
          title="ytplayer"
          type="text/html"
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/${x.key}`}
          frameBorder="0"
        />
      ))}
  </>
);

Videos.propTypes = {};

export default Videos;
