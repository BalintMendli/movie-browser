import React from 'react';
import PropTypes from 'prop-types';
import SmallCards from '../Misc/SmallCards';
import { movieType, tvType } from '../types';

const Similar = ({ data, type }) => (
  <div>
    {data.similar.results.map(x => (
      <SmallCards key={x.id} data={x} type={type} page="similar" />
    ))}
  </div>
);

Similar.propTypes = {
  data: PropTypes.oneOfType([movieType, tvType]).isRequired,
};

export default Similar;
