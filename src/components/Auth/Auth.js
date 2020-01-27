import qs from 'query-string';
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setUser } from '../../redux/actions';

const url = 'https://api.themoviedb.org/3/authentication/session/new?api_key=';
const API_KEY = process.env.REACT_APP_API_KEY;

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    const { location, setUser } = this.props;
    axios
      .post(`${url}${API_KEY}`, {
        request_token: qs.parse(location.search).request_token,
      })
      .then(response => {
        setUser(response.data.session_id);
        this.setState({
          isLoading: false,
        });
      })
      .catch(error => this.setState({ error }));
  }

  render() {
    const { isLoading, error } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return <Redirect to="/profile" />;
  }
}

export default connect(null, { setUser })(Auth);
