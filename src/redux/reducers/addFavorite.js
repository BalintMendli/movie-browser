import {
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_REQUEST,
  ADD_FAVORITE_FAILURE,
} from '../actions/types';

const initialState = {
  loading: false,
  error: null,
};

export function addFavorite(state = initialState, action) {
  const { type, error } = action;
  switch (type) {
    case ADD_FAVORITE_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_FAVORITE_SUCCESS:
      return { ...state, loading: false };
    case ADD_FAVORITE_FAILURE:
      return { ...state, loading: false, error };
    default:
      return state;
  }
}
