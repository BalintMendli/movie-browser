import React, { Component } from 'react';
import axios from 'axios';
import { bg, posterImg } from '../Style/style.module.css';

const url = 'https://api.themoviedb.org/3/authentication/token/new?api_key=';
const API_KEY = process.env.REACT_APP_API_KEY;

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
    this.signIn = this.signIn.bind(this);
  }

  signIn() {
    let requestToken = null;
    axios
      .get(`${url}${API_KEY}`)
      .then(response => {
        requestToken = response.data.request_token;
        console.log(response.data, requestToken, window.location.href);
        if (requestToken) {
          window.location.replace(
            `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${
              window.location.href
            }/auth`
          );
        }
      })
      .catch(error =>
        this.setState({
          error,
        })
      );
  }

  render() {
    const { error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <div className={bg}>
        <button onClick={this.signIn}>Log In with Tmdb</button>
        <button>Sign In as Guest</button>
      </div>
    );
  }
}
