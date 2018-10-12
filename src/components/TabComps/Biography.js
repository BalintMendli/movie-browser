import React from 'react';
import PropTypes from 'prop-types';

const Biography = ({ data }) => (
  <>
    <h4>Biography</h4>
    <p>{data.biography}</p>
  </>
);

Biography.propTypes = {};

export default Biography;
