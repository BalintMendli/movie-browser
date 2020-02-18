import { SET_AUTH, LOGOUT_SUCCESS } from '../actions/types';
import { getAuthInfo } from '../../utils/storage';

export function auth(state = getAuthInfo(), action) {
  const { type, payload } = action;
  switch (type) {
    case SET_AUTH:
      return payload;
    case LOGOUT_SUCCESS:
      return { sessionId: null, guest: null };
    default:
      return state;
  }
}
