import {
  ADD_BOOKMARK_SUCCESS,
  ADD_BOOKMARK_REQUEST,
  ADD_BOOKMARK_FAILURE,
} from '../actions/types';

const initialState = {
  loading: false,
  error: null,
};

export function addBookmark(state = initialState, action) {
  const { type, error } = action;
  switch (type) {
    case ADD_BOOKMARK_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_BOOKMARK_SUCCESS:
      return { ...state, loading: false };
    case ADD_BOOKMARK_FAILURE:
      return { ...state, loading: false, error };
    default:
      return state;
  }
}
