import { combineReducers } from 'redux';
import { lists, listsIsLoading, listsError } from './lists';
import { details, detailsIsLoading, detailsError } from './details';
import { rated } from './rated';
import { favorites } from './favorites';
import { accountDetails } from './accountDetails';
import { auth } from './auth';
import { submitRating } from './submitRating';

export default combineReducers({
  lists,
  listsIsLoading,
  listsError,
  details,
  detailsIsLoading,
  detailsError,
  auth,
  rated,
  favorites,
  accountDetails,
  submitRating,
});
