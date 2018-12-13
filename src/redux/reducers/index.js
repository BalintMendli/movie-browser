import { combineReducers } from 'redux';
import { lists, listsIsLoading, listsError } from './lists';
import { details, detailsIsLoading, detailsError } from './details';
import { auth } from './auth';

export default combineReducers({
  lists,
  listsIsLoading,
  listsError,
  details,
  detailsIsLoading,
  detailsError,
  auth,
});
