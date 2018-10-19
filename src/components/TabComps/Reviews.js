import React from 'react';
import { hr } from '../Style/style.module.css';

const Reviews = ({ data }) => {
  if (!data.reviews.results.length) {
    return <div>No reviews yet...</div>;
  }
  return data.reviews.results.map(x => (
    <React.Fragment key={x.id}>
      <div>
        <h4 className="mt-4 mb-3">{`A review by ${x.author}`}</h4>
        <p style={{ whiteSpace: 'pre-line' }}>{x.content}</p>
      </div>
      <hr className={hr} />
    </React.Fragment>
  ));
};

export default Reviews;
