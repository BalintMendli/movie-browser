import { Container } from 'mdbreact';
import React, { Component } from 'react';
import axios from 'axios';
import { bg } from './style.module.css';

const API_KEY = process.env.REACT_APP_API_KEY;

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${
          this.props.location.state.sessionId
        }`
      )
      .then(response => {
        this.setState({ profile: response.data, isLoading: false });
        console.log(response.data);
      })
      .catch(error =>
        this.setState({
          error,
          isLoading: false,
        })
      );
  }

  render() {
    console.log(this.props.location.state.sessionId);

    const { profile, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div className={bg}>
        <Container className="text-white">
          <h2>Profile</h2>
          <p>{profile.username}</p>
        </Container>
      </div>
    );
  }
}
