import React from 'react';
import PropTypes from 'prop-types';
import SmallCards from '../Misc/SmallCards';

const Similar = ({ data }) =>
  data.similar.results.map(x => (
    <SmallCards key={x.id} data={x} type="movie-similar" />
  ));

Similar.propTypes = {
  data: PropTypes.shape({ id: PropTypes.number }).isRequired,
};

export default Similar;
