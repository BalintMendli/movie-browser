import React from 'react';
import PropTypes from 'prop-types';
import SmallCards from './SmallCards';

const Cast = ({ data }) => <SmallCards data={data.credits.cast} />;

Cast.propTypes = {};

export default Cast;
