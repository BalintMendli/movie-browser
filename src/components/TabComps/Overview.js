import React from 'react';
import PropTypes from 'prop-types';
import { Fa } from 'mdbreact';

const Overview = ({ data, type }) => {
  if (type === 'person') {
    return (
      <>
        <h4>Name</h4>
        <p>{data.name}</p>
        <h4>Also Known As</h4>
        <p>{data.also_known_as.map(name => name).join(', ')}</p>
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

  if (type === 'tv') {
    return (
      <>
        <h4>Genre</h4>
        <p>{data.genres.map(genre => genre.name).join(', ')}</p>
        <h4>Created By</h4>
        <p>{data.created_by.map(creator => creator.name).join(', ')}</p>
        <h4>Summary</h4>
        <p>{data.overview}</p>
        <h4>Episode Runtime</h4>
        <p>{`${data.episode_run_time[0]} min`}</p>
        <h4>First Air Date</h4>
        <p>{data.first_air_date}</p>
        <h4>Official Website</h4>
        <p>
          {data.homepage ? (
            <a href={data.homepage} target="_blank" rel="noreferrer noopener">
              {data.homepage}
            </a>
          ) : (
            '-'
          )}
        </p>
        <h4>Production Companies</h4>
        <p>{data.production_companies.map(comp => comp.name).join(', ')}</p>
        <h4>Rating</h4>
        <p className="text-left font-weight-bold">
          <Fa icon="star" className="amber-text pr-1" />
          {data.vote_average}
          <span style={{ fontSize: '12px', fontWeight: 'normal' }}>
            /10 ({data.vote_count})
          </span>
        </p>
      </>
    );
  }

  if (type === 'movie') {
    return (
      <>
        <h4>Genre</h4>
        <p>{data.genres.map(genre => genre.name).join(', ')}</p>
        <h4>Release Date</h4>
        <p>{data.release_date}</p>
        <h4>Runtime</h4>
        <p>{`${data.runtime} min`}</p>
        <h4>Summary</h4>
        <p>{data.overview}</p>
        <h4>Official Website</h4>
        <p>
          {data.homepage ? (
            <a href={data.homepage} target="_blank" rel="noreferrer noopener">
              {data.homepage}
            </a>
          ) : (
            '-'
          )}
        </p>
        <h4>Production Companies</h4>
        <p>{data.production_companies.map(comp => comp.name).join(', ')}</p>
        <h4>Budget</h4>
        <p>
          {data.budget
            ? new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(data.budget)
            : 'No data'}
        </p>
        <h4>Revenue</h4>
        <p>
          {data.revenue
            ? new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(data.revenue)
            : 'No data'}
        </p>
        <h4>Rating</h4>
        <p className="text-left font-weight-bold">
          <Fa icon="star" className="amber-text pr-1" />
          {data.vote_average}
          <span style={{ fontSize: '12px', fontWeight: 'normal' }}>
            /10 ({data.vote_count})
          </span>
        </p>
      </>
    );
  }
};

Overview.propTypes = {
  type: PropTypes.string,
  data: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

Overview.defaultProps = {
  type: 'movie',
};

export default Overview;
