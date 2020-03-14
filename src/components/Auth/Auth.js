import qs from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getSession } from '../../redux/actions/auth';
import Loading from '../Misc/Loading';
import Error from '../Misc/Error';

class Auth extends Component {
  componentDidMount() {
    const { location, getSession } = this.props;
    getSession(qs.parse(location.search).request_token);
  }

  render() {
    const { loading, error, sessionId } = this.props;
    if (error) {
      return <Error />;
    }

    if (loading || !sessionId) {
      return <Loading />;
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
