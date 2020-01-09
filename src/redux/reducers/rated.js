import { RATED_REQUEST, RATED_SUCCESS, RATED_FAILURE } from '../actions/types';

const initialState = {
  ratedMovie: [],
  ratedTv: [],
  loading: false,
  error: null,
};

export function rated(state = initialState, action) {
  const { type, ratedMovies, ratedTv, error } = action;
  switch (type) {
    case RATED_REQUEST:
      return { ...state, loading: true, error: null };
    case RATED_SUCCESS:
      return { ...state, loading: false, ratedMovies, ratedTv };
    case RATED_FAILURE:
      return { ...state, loading: false, error };
    default:
      return state;
  }
}
