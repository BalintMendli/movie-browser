import { combineReducers } from 'redux';
import { lists } from './lists';
import { details } from './details';
import { rated } from './rated';
import { favorites } from './favorites';
import { accountDetails } from './accountDetails';
import { auth } from './auth';
import { submitRating } from './submitRating';
import { addFavorite } from './addFavorite';

export default combineReducers({
  lists,
  details,
  auth,
  rated,
  favorites,
  accountDetails,
  submitRating,
  addFavorite,
});
