import React, { Component } from 'react';
import axios from 'axios';
import { MDBBtn } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import { bg, posterImg } from '../Style/style.module.css';

const tokenUrl =
  'https://api.themoviedb.org/3/authentication/token/new?api_key=';
const guestUrl =
  'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=';
const API_KEY = process.env.REACT_APP_API_KEY;

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      redirect: false,
    };
    this.signIn = this.signIn.bind(this);
    this.guestSignIn = this.guestSignIn.bind(this);
  }

  signIn() {
    let requestToken = null;
    axios
      .get(`${tokenUrl}${API_KEY}`)
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

  guestSignIn() {
    axios
      .get(`${guestUrl}${API_KEY}`)
      .then(response => {
        console.log(response.data);
        if (response.data.guest_session_id) {
          localStorage.setItem(
            'guest_session_id',
            response.data.guest_session_id
          );
          this.setState({
            redirect: true,
          });
        }
      })
      .catch(error =>
        this.setState({
          error,
        })
      );
  }

  render() {
    const { error, redirect } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (redirect) {
      return <Redirect to="/profile" />;
    }

    return (
      <div
        className={`d-flex flex-column justify-content-center align-items-center ${bg}`}
      >
        <MDBBtn size="lg" className="span3 mb-5 p-4" onClick={this.signIn}>
          Log In with Tmdb
        </MDBBtn>
        <MDBBtn size="lg" className="p-4" onClick={this.guestSignIn}>
          Sign In as Guest
        </MDBBtn>
      </div>
    );
  }
}
