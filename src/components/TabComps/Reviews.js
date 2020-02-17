import React from 'react';
import PropTypes from 'prop-types';
import { hr, whiteSpace } from '../Style/style.module.css';
import { movieType, tvType } from '../types';

const Reviews = ({ data }) => {
  if (!data.reviews.results.length) {
    return <div>No reviews yet...</div>;
  }
  return data.reviews.results.map(x => (
    <React.Fragment key={x.id}>
      <div>
        <h4 className="mt-4 mb-3">{`A review by ${x.author}`}</h4>
        <p className={whiteSpace}>{x.content}</p>
      </div>
      <hr className={hr} />
    </React.Fragment>
  ));
};

Reviews.propTypes = {
  data: PropTypes.oneOfType([movieType, tvType]).isRequired,
};

export default Reviews;
