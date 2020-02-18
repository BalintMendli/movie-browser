import {
  LOGOUT_SUCCESS,
  SESSION_SUCCESS,
  SESSION_FAILURE,
  SESSION_REQUEST,
} from '../actions/types';
import { getAuthInfo } from '../../utils/storage';

export function auth(state = getAuthInfo(), action) {
  const { type, payload, error } = action;
  switch (type) {
    case SESSION_REQUEST:
      return { loading: true, error: null };
    case SESSION_SUCCESS:
      return payload;
    case SESSION_FAILURE:
      return { loading: false, error };
    case LOGOUT_SUCCESS:
      return { sessionId: null, guest: null };
    default:
      return state;
  }
}
