import {
  DETAILS_SUCCESS,
  DETAILS_REQUEST,
  DETAILS_ERROR,
  SUBMIT_RATING_SUCCESS,
  ADD_FAVORITE_SUCCESS,
  ADD_BOOKMARK_SUCCESS,
} from '../actions/types';

const initialState = {
  loading: false,
  error: null,
  data: null,
};

export function details(state = initialState, action) {
  const { type, response, rating, favorite, watchlist } = action;
  switch (type) {
    case DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
    case DETAILS_SUCCESS:
      return { ...state, data: response, loading: false };
    case DETAILS_ERROR:
      return { ...state, error: action.error, loading: false };
    case SUBMIT_RATING_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          account_states: {
            ...state.data.account_states,
            rated: { value: rating },
          },
        },
      };
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
