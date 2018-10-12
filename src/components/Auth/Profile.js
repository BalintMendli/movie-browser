import { Container } from 'mdbreact';
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { bg } from '../Style/style.module.css';
import SmallCards from '../Misc/SmallCards';

const API_KEY = process.env.REACT_APP_API_KEY;

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      favoriteMovies: [],
      favoriteTv: [],
      isLoading: true,
      error: null,
      redirect: false,
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const sessionId = localStorage.getItem('session_id');
    axios
      .get(
        `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${sessionId}`
      )
      .then(response => {
        this.setState({ profile: response.data, isLoading: false });
        localStorage.setItem('profile_id', response.data.id);
        console.log(response.data);
        return Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/account/${
              response.data.id
            }/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}`
          ),
          axios.get(
            `https://api.themoviedb.org/3/account/${
              response.data.id
            }/favorite/tv?api_key=${API_KEY}&session_id=${sessionId}`
          ),
        ]);
      })
      .then(response => {
        this.setState({
          favoriteMovies: response[0].data.results,
          favoriteTv: response[1].data.results,
        });
        console.log(response[0].data);
        console.log(response[1].data);
      })
      .catch(error =>
        this.setState({
          error,
          isLoading: false,
        })
      );
  }

  logout() {
    axios
      .delete(
        `https://api.themoviedb.org/3/authentication/session?api_key=${API_KEY}`,
        {
          params: { session_id: localStorage.getItem('session_id') },
        }
      )
      .then(response => {
        console.log(response);
        if (response.data.success) {
          localStorage.clear();
          this.setState({
            redirect: true,
          });
        }
      });
  }

  render() {
    const {
      profile,
      favoriteMovies,
      favoriteTv,
      isLoading,
      error,
      redirect,
    } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    if (redirect) {
      return <Redirect push to="/" />;
    }

    return (
      <div className={bg}>
        <Container className="text-white">
          <h2>Profile</h2>
          <h5>Username:</h5>
          <p>{profile.username}</p>
          <h5>Name:</h5>
          <p>{profile.name}</p>
          <h5>Account Id:</h5>
          <p>{profile.id}</p>
          <h5>Avatar:</h5>
          <img
            src={`https://www.gravatar.com/avatar/${
              profile.avatar.gravatar.hash
            }`}
            alt="gravatar"
          />
          <h5>Favorite Movies:</h5>
          {favoriteMovies.map(x => (
            <SmallCards key={x.id} data={x} type="movie" />
          ))}
          <h5>Favorite TV Shows:</h5>
          {favoriteTv.map(x => (
            <SmallCards key={x.id} data={x} type="tv" />
          ))}
          <button type="button" onClick={this.logout}>
            Log Out
          </button>
        </Container>
      </div>
    );
  }
}
