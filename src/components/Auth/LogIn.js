import React, { Component } from 'react';
import axios from 'axios';
import { MDBBtn } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser, getToken } from '../../redux/actions';
import { bg } from '../Style/style.module.css';

const guestUrl =
  'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=';
const API_KEY = process.env.REACT_APP_API_KEY;

class LogIn extends Component {
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
    const { getToken } = this.props;
    getToken();
  }

  guestSignIn() {
    const { setUser } = this.props;
    axios
      .get(`${guestUrl}${API_KEY}`)
      .then(response => {
        console.log(response.data);
        if (response.data.guest_session_id) {
          setUser(response.data.guest_session_id, true);
          this.setState({
            redirect: true,
          });
        }
      })
      .catch(error =>
        this.setState({
          error,
        }),
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

export default connect(null, { setUser, getToken })(LogIn);
