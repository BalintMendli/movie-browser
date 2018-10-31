import { combineReducers } from 'redux';
import lists from './lists';
import tvShows from './tvShows';

export default combineReducers({
  lists,
  tvShows,
});
