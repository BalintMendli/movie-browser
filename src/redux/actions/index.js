import { setAuth, deleteAuth } from '../../utils/storage';
import { SET_AUTH, DEL_AUTH } from './types';

export { fetchLists } from './fetchLists';

export { fetchDetails } from './fetchDetails';

export { submitRating } from './submitRating';

export function setUser(sessionId, guest) {
  setAuth(sessionId, guest);
  console.log(sessionId);
  return {
    type: SET_AUTH,
    payload: { sessionId, guest },
  };
}

export function forgetUser(sessionId) {
  deleteAuth(sessionId);
  return {
    type: DEL_AUTH,
  };
}
