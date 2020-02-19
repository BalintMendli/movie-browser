import qs from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getSession } from '../../redux/actions';

class Auth extends Component {
  componentDidMount() {
    const { location, getSession } = this.props;
    getSession(qs.parse(location.search).request_token);
  }

  render() {
    const { loading, error, sessionId } = this.props;
    if (error) {
      return <p>{error.message}</p>;
    }

    if (loading || !sessionId) {
      return <p>Loading ...</p>;
    }

    return <Redirect to="/profile" />;
  }
}

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error,
  sessionId: auth.sessionId,
});

export default connect(mapStateToProps, { getSession })(Auth);
