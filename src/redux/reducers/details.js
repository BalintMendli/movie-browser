import { SET_DETAILS, DETAILS_LOADING, DETAILS_ERROR } from '../actions/types';
import { parseLists } from '../../utils/parseData';

export function details(state = {}, action) {
  const { type, response, mediaType } = action;
  switch (type) {
    case SET_DETAILS:
      return { ...state, [mediaType]: response };
    default:
      return state;
  }
}

export function detailsError(state = null, action) {
  switch (action.type) {
    case DETAILS_ERROR:
      return action.error;
    default:
      return state;
  }
}

export function detailsIsLoading(state = {}, action) {
  const { type, value, mediaType } = action;
  switch (type) {
    case DETAILS_LOADING:
      return { ...state, [mediaType]: value };
    default:
      return state;
  }
}
