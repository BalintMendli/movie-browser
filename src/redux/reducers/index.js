import { combineReducers } from 'redux';
import { lists } from './lists';
import { details } from './details';
import { accountInfo } from './accountInfo';
import { auth } from './auth';
import { submitRating } from './submitRating';
import { addFavorite } from './addFavorite';
import { addBookmark } from './addBookmark';
import { notifications } from './notifications';

export default combineReducers({
  lists,
  details,
  auth,
  accountInfo,
  submitRating,
  addFavorite,
  addBookmark,
  notifications,
});
