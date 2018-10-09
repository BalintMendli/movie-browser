import React from 'react';

const Reviews = ({ data }) => {
  if (!data.reviews.results.length) {
    return <div>No reviews yet...</div>;
  }
  return data.reviews.results.map(x => (
    <div key={x.id}>
      <h5>{x.author}</h5>
      <p>{x.content}</p>
    </div>
  ));
};

export default Reviews;
