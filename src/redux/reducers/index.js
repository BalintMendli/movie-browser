import { combineReducers } from 'redux';
import { lists, listsIsLoading, listsError } from './lists';

export default combineReducers({
  lists,
  listsIsLoading,
  listsError,
});
