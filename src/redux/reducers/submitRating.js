import {
  SUBMIT_RATING_SUCCESS,
  SUBMIT_RATING_REQUEST,
  SUBMIT_RATING_FAILURE,
} from '../actions/types';

const initialState = {
  loading: false,
  error: null,
};

export function submitRating(state = initialState, action) {
  const { type, error } = action;
  switch (type) {
    case SUBMIT_RATING_REQUEST:
      return { ...state, loading: true, error: null };
    case SUBMIT_RATING_SUCCESS:
      return { ...state, loading: false };
    case SUBMIT_RATING_FAILURE:
      return { ...state, loading: false, error };
    default:
      return state;
  }
}
