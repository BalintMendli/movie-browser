import axios from 'axios';
import { setAuth, deleteAuth } from '../../utils/storage';
import {
  SET_AUTH,
  DEL_AUTH,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from './types';
import { API_KEY } from '../../utils/resources';

export function setUser(sessionId, guest) {
  setAuth(sessionId, guest);
  return {
    type: SET_AUTH,
    payload: { sessionId, guest },
  };
}

export function logoutUser(sessionId) {
  return dispatch => {
    dispatch({ type: LOGOUT_REQUEST });
    try {
      axios
        .delete(
          `https://api.themoviedb.org/3/authentication/session?api_key=${API_KEY}`,
          { params: { session_id: sessionId } },
        )
        .then(response => {
          console.log(response);
          dispatch({ type: LOGOUT_SUCCESS });
          deleteAuth();
        });
    } catch (error) {
      dispatch({ type: LOGOUT_FAILURE, error });
    }
  };
}
