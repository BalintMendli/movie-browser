import { Container } from 'mdbreact';
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bg } from '../Style/style.module.css';
import SmallCards from '../Misc/SmallCards';
import { getAuthInfo, getSessionId } from '../../utils/storage';
import { forgetUser } from '../../redux/actions';

const API_KEY = process.env.REACT_APP_API_KEY;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      favoriteMovies: [],
      favoriteTv: [],
      ratedMovies: [],
      ratedTv: [],
      isLoading: true,
      error: null,
      redirect: false,
      guest: false,
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const authInfo = getAuthInfo();
    const sessionId = authInfo.guest ? null : authInfo.sessionId;
    const guestSessionId = authInfo.guest ? authInfo.sessionId : null;
    console.log(authInfo.guest);
    if (sessionId) {
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
            isLoading: false,
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
    } else if (guestSessionId) {
      this.setState({ guest: true });
      Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${API_KEY}`
        ),
        axios.get(
          `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/tv?api_key=${API_KEY}`
        ),
      ])
        .then(response => {
          this.setState({
            ratedMovies: response[0].data.results,
            ratedTv: response[1].data.results,
            isLoading: false,
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
  }

  logout() {
    const { forgetUser } = this.props;
    axios
      .delete(
        `https://api.themoviedb.org/3/authentication/session?api_key=${API_KEY}`,
        {
          params: { session_id: getSessionId() },
        }
      )
      .then(response => {
        console.log(response);
        if (response.data.success) {
          forgetUser();
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
      ratedMovies,
      ratedTv,
      isLoading,
      error,
      redirect,
      guest,
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

    if (!guest) {
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
              <SmallCards key={x.id} data={x} type="movie" page="profile" />
            ))}
            <h5>Favorite TV Shows:</h5>
            {favoriteTv.map(x => (
              <SmallCards key={x.id} data={x} type="tv" page="profile" />
            ))}
            <button type="button" onClick={this.logout}>
              Log Out
            </button>
          </Container>
        </div>
      );
    }

    return (
      <div className={bg}>
        <Container className="text-white">
          <h2>Guest Profile</h2>
          <h5>Rated Movies:</h5>
          {ratedMovies.map(x => (
            <SmallCards key={x.id} data={x} type="movie" page="profile" />
          ))}
          <h5>Rated TV Shows:</h5>
          {ratedTv.map(x => (
            <SmallCards key={x.id} data={x} type="tv" page="profile" />
          ))}
          <button type="button" onClick={this.logout}>
            Log Out
          </button>
        </Container>
      </div>
    );
  }
}

export default connect(
  null,
  { forgetUser }
)(Profile);
