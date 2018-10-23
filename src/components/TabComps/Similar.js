import React from 'react';
import PropTypes from 'prop-types';
import SmallCards from '../Misc/SmallCards';

const Similar = ({ data, type }) => (
  <div>
    {data.similar.results.map(x => (
      <SmallCards key={x.id} data={x} type={type} page="similar" />
    ))}
  </div>
);

Similar.propTypes = {
  data: PropTypes.shape({ id: PropTypes.number }).isRequired,
};

export default Similar;
