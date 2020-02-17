import React from 'react';
import { whiteSpace } from '../Style/style.module.css';
import { personType } from '../types';

const Biography = ({ data }) => (
  <>
    <h4 className="mt-4 mb-3">Biography</h4>
    <p className={whiteSpace}>{data.biography}</p>
  </>
);

Biography.propTypes = {
  data: personType.isRequired,
};

export default Biography;
