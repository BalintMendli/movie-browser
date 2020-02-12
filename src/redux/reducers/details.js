import {
  SET_DETAILS,
  DETAILS_REQUEST,
  DETAILS_ERROR,
  ADD_FAVORITE_SUCCESS,
  ADD_BOOKMARK_SUCCESS,
} from '../actions/types';

export function details(state = {}, action) {
  const { type, response, favorite, watchlist } = action;
  switch (type) {
    case SET_DETAILS:
      return { ...state, data: response };
    case ADD_FAVORITE_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          account_states: { ...state.data.account_states, favorite },
        },
      };
    case ADD_BOOKMARK_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          account_states: { ...state.data.account_states, watchlist },
        },
      };
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
    case DETAILS_REQUEST:
      return { ...state, [mediaType]: value };
    default:
      return state;
  }
}
