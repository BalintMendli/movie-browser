import qs from 'query-string';
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const url = 'https://api.themoviedb.org/3//authentication/session/new?api_key=';
const API_KEY = process.env.REACT_APP_API_KEY;

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionId: null,
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    console.log(qs.parse(this.props.location.search));
    axios
      .post(`${url}${API_KEY}`, {
        request_token: qs.parse(this.props.location.search).request_token,
      })
      .then(response => {
        this.setState({
          sessionId: response.data.session_id,
          isLoading: false,
        });
      })
      .catch(error =>
        this.setState({
          error,
        })
      );
  }

  render() {
    const { isLoading, error, sessionId } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <Redirect
        to={{
          pathname: '/profile',
          state: { sessionId },
        }}
      />
    );
  }
}
