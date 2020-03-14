import { Container } from 'mdbreact';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bg } from '../Style/style.module.css';
import SmallCards from '../Misc/SmallCards';
import { logoutUser } from '../../redux/actions/auth';
import getAccountInfo from '../../redux/actions/getAccountInfo';
import Loading from '../Misc/Loading';
import Error from '../Misc/Error';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const { getAccountInfo } = this.props;
    getAccountInfo();
  }

  logout() {
    const { logoutUser } = this.props;
    logoutUser();
  }

  render() {
    const {
      ratedMovies,
      ratedTv,
      favoriteMovies,
      favoriteTv,
      watchlistMovies,
      watchlistTv,
      profile,
      error,
      loading,
    } = this.props;

    if (error) {
      return <Error />;
    }

    if (loading || !ratedTv || !ratedMovies) {
      return <Loading />;
    }

    if (profile) {
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
            <h5>Watchlist Movies:</h5>
            {watchlistMovies.map(x => (
              <SmallCards key={x.id} data={x} type="movie" page="profile" />
            ))}
            <h5>Watchlist TV Shows:</h5>
            {watchlistTv.map(x => (
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

const mapStateToProps = ({ accountInfo }) => ({
  ratedMovies: accountInfo.ratedMovies?.results,
  ratedTv: accountInfo.ratedTv?.results,
  favoriteMovies: accountInfo.favoriteMovies?.results,
  favoriteTv: accountInfo.favoriteTv?.results,
  watchlistMovies: accountInfo.watchlistMovies?.results,
  watchlistTv: accountInfo.watchlistTv?.results,
  profile: accountInfo.details,
});

export default connect(mapStateToProps, {
  getAccountInfo,
  logoutUser,
})(Profile);
