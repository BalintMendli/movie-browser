import React from 'react';
import PropTypes from 'prop-types';
import { whiteSpace } from '../Style/style.module.css';

const Biography = ({ data }) => (
  <>
    <h4 className="mt-4 mb-3">Biography</h4>
    <p className={whiteSpace}>{data.biography}</p>
  </>
);

Biography.propTypes = {};

export default Biography;
