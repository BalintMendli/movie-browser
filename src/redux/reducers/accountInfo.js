import {
  ACCOUNT_INFO_REQUEST,
  ACCOUNT_INFO_SUCCESS,
  ACCOUNT_INFO_FAILURE,
  LOGOUT_SUCCESS,
} from '../actions/types';

const initialState = {
  loading: false,
  error: null,
};

export function accountInfo(state = initialState, action) {
  const { type, payload, error } = action;
  switch (type) {
    case ACCOUNT_INFO_REQUEST:
      return { ...state, loading: true, error: null };
    case ACCOUNT_INFO_SUCCESS:
      return { ...state, loading: false, ...payload };
    case ACCOUNT_INFO_FAILURE:
      return { ...state, loading: false, error };
    case LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}
