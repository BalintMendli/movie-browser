import React from 'react';
import PropTypes from 'prop-types';

const Similar = ({ data }) => (
  <>
    {data.similar.results.map(x => (
      <div key={x.id}>{x.title}</div>
    ))}
  </>
);

Similar.propTypes = {};

export default Similar;
