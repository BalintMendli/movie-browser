import { combineReducers } from 'redux';
import { lists, listsIsLoading, listsError } from './lists';
import { details, detailsIsLoading, detailsError } from './details';
import { rated } from './rated';
import { favorite } from './favorite';
import { accountDetails } from './accountDetails';
import { auth } from './auth';

export default combineReducers({
  lists,
  listsIsLoading,
  listsError,
  details,
  detailsIsLoading,
  detailsError,
  auth,
  rated,
  favorite,
  accountDetails,
});
