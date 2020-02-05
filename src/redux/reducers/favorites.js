import {
  FAVORITES_REQUEST,
  FAVORITES_SUCCESS,
  FAVORITES_FAILURE,
} from '../actions/types';

const initialState = {
  favoriteMovies: [],
  favoriteTv: [],
  loading: false,
  error: null,
};

export function favorites(state = initialState, action) {
  const { type, favoriteMovies, favoriteTv, error } = action;
  switch (type) {
    case FAVORITES_REQUEST:
      return { ...state, loading: true, error: null };
    case FAVORITES_SUCCESS:
      return { ...state, loading: false, favoriteMovies, favoriteTv };
    case FAVORITES_FAILURE:
      return { ...state, loading: false, error };
    default:
      return state;
  }
}
