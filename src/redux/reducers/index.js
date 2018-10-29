import { combineReducers } from 'redux';
import movies from './movies';
import tvShows from './tvShows';

export default combineReducers({
  movies,
  tvShows,
});
