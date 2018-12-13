import { SET_AUTH, DEL_AUTH } from '../actions/types';
import { getAuthInfo } from '../../utils/storage';

export function auth(state = getAuthInfo(), action) {
  const { type, payload } = action;
  switch (type) {
    case SET_AUTH:
      return payload;
    case DEL_AUTH:
      return { sessionId: null };
    default:
      return state;
  }
}
