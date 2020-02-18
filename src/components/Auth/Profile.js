import { Container } from 'mdbreact';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bg } from '../Style/style.module.css';
import SmallCards from '../Misc/SmallCards';
import { logoutUser } from '../../redux/actions';
import { getRated } from '../../redux/actions/getRated';
import { getFavorites } from '../../redux/actions/getFavorites';
import { getAccountDetails } from '../../redux/actions/getAccountDetails';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const { getRated, getFavorites, getAccountDetails, isGuest } = this.props;
    getRated();
    if (!isGuest) {
      getAccountDetails();
      getFavorites();
    }
  }

  logout() {
    const { logoutUser, sessionId } = this.props;
    logoutUser(sessionId);
  }

  render() {
    const {
      ratedMovies,
      ratedTv,
      favoriteMovies,
      favoriteTv,
      profile,
      error,
      loading,
    } = this.props;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (loading || !ratedTv || !ratedMovies) {
      return <p>Loading ...</p>;
    }

    if (profile.id) {
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
              src={`https://www.gravatar.com/avatar/${profile.avatar.gravatar.hash}`}
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

const mapStateToProps = ({ rated, favorites, accountDetails, auth }) => ({
  isGuest: auth.guest,
  sessionId: auth.sessionId,
  ratedMovies: rated.ratedMovies,
  ratedTv: rated.ratedTv,
  favoriteMovies: favorites.favoriteMovies,
  favoriteTv: favorites.favoriteTv,
  profile: accountDetails.details,
});

export default connect(mapStateToProps, {
  logoutUser,
  getRated,
  getFavorites,
  getAccountDetails,
})(Profile);
