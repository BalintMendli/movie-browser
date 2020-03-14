import React, { Component } from 'react';
import { MDBBtn } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGuestSession, getToken } from '../../redux/actions/auth';
import { bg } from '../Style/style.module.css';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.guestSignIn = this.guestSignIn.bind(this);
  }

  signIn() {
    const { getToken } = this.props;
    getToken();
  }

  guestSignIn() {
    const { getGuestSession } = this.props;
    getGuestSession();
  }

  render() {
    const { sessionId } = this.props;

    if (sessionId) {
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

const mapStateToProps = ({ auth }) => ({ sessionId: auth.sessionId });

export default connect(mapStateToProps, { getGuestSession, getToken })(LogIn);
