import {
  ACCOUNT_DETAILS_REQUEST,
  ACCOUNT_DETAILS_SUCCESS,
  ACCOUNT_DETAILS_FAILURE,
  DEL_AUTH,
} from '../actions/types';

const initialState = {
  details: {},
  loading: false,
  error: null,
};

export function accountDetails(state = initialState, action) {
  const { type, details, error } = action;
  switch (type) {
    case ACCOUNT_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
    case ACCOUNT_DETAILS_SUCCESS:
      return { ...state, loading: false, details };
    case ACCOUNT_DETAILS_FAILURE:
      return { ...state, loading: false, error };
    case DEL_AUTH:
      return {};
    default:
      return state;
  }
}
