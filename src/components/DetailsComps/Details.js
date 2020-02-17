import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDetails } from '../../redux/actions';
import Backdrop from './Backdrop';
import DetailsLower from './DetailsLower';
import { movieType, tvType, personType } from '../types';

function getMedia(path) {
  return path.match(/\w+(?=\/)/)[0];
}

class Details extends Component {
  componentDidMount() {
    const { match, fetchDetails } = this.props;
    const media = getMedia(match.path);
    fetchDetails({ id: match.params.id, mediaType: media });
  }

  componentDidUpdate(prevProps) {
    const { match, fetchDetails } = this.props;
    const media = getMedia(match.path);
    if (match.params.id !== prevProps.match.params.id) {
      fetchDetails({ id: match.params.id, mediaType: media });
    }
  }

  render() {
    const { details, loading, error, match } = this.props;
    const media = getMedia(match.path);

    if (error) {
      return <p>{error.message}</p>;
    }

    if (loading || !details || parseInt(match.params.id, 10) !== details.id) {
      return <p>Loading ...</p>;
    }

    return (
      <>
        {media !== 'person' && details.backdrop_path && (
          <Backdrop
            backdropPath={details.backdrop_path}
            title={details.title || details.name}
            tagline={details.tagline}
            genres={details.genres}
            voteAverage={details.vote_average}
          />
        )}
        <DetailsLower mediaType={media} data={details} />
      </>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  details: PropTypes.oneOfType([movieType, tvType, personType]),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.instanceOf(Error),
  fetchDetails: PropTypes.func.isRequired,
};

Details.defaultProps = {
  details: null,
  error: null,
};

const mapStateToProps = ({ details }) => ({
  details: details.data,
  loading: details.loading,
  error: details.error,
});

export default connect(mapStateToProps, { fetchDetails })(Details);
