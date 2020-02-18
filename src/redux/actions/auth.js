import axios from 'axios';
import { setAuth, deleteAuth } from '../../utils/storage';
import {
  SET_AUTH,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  AUTH_REQUEST,
  AUTH_FAILURE,
} from './types';
import { API_KEY } from '../../utils/resources';

export function setUser(sessionId, guest) {
  setAuth(sessionId, guest);
  return {
    type: SET_AUTH,
    payload: { sessionId, guest },
  };
}

export function authRequest() {
  return dispatch => {
    dispatch({ type: AUTH_REQUEST });
    const tokenUrl =
      'https://api.themoviedb.org/3/authentication/token/new?api_key=';
    axios
      .get(`${tokenUrl}${API_KEY}`)
      .then(response => {
        const requestToken = response.data.request_token;
        console.log(response.data, requestToken, window.location.href);
        if (requestToken) {
          window.location.replace(
            `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.href}/auth`,
          );
        }
      })
      .catch(error => {
        dispatch({ type: AUTH_FAILURE, error });
      });
  };
}

export function logoutUser(sessionId) {
  return dispatch => {
    dispatch({ type: LOGOUT_REQUEST });
    axios
      .delete(
        `https://api.themoviedb.org/3/authentication/session?api_key=${API_KEY}`,
        { params: { session_id: sessionId } },
      )
      .then(response => {
        console.log(response);
        dispatch({ type: LOGOUT_SUCCESS });
        deleteAuth();
      })
      .catch(error => {
        dispatch({ type: LOGOUT_FAILURE, error });
      });
  };
}
