import React from 'react';
import PropTypes from 'prop-types';

const Overview = ({ data, type }) => {
  if (type === 'person') {
    return (
      <>
        <h4>Name</h4>
        <p>{data.name}</p>
        <h4>Gender</h4>
        <p>{data.gender === 1 ? 'Female' : data.gender === 2 ? 'Male' : '-'}</p>
        <h4>Birthday</h4>
        <p>{data.birthday}</p>
        <h4>Place of Birth</h4>
        <p>{data.place_of_birth}</p>
        {data.deathday && (
          <>
            <h4>Died</h4>
            <p>{data.deathday}</p>
          </>
        )}
        {data.homepage && (
          <>
            <h4>Official Site</h4>
            <p>
              <a href={data.homepage} target="_blank" rel="noreferrer noopener">
                {data.homepage}
              </a>
            </p>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <h4>Release Date</h4>
      <p>{data.release_date}</p>
      <h4>Runtime</h4>
      <p>{`${data.runtime} min`}</p>
      <h4>Summary</h4>
      <p>{data.overview}</p>
    </>
  );
};

Overview.propTypes = {};

export default Overview;
