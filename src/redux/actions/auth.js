import axios from 'axios';
import { setAuth, deleteAuth } from '../../utils/storage';
import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILURE,
  SESSION_REQUEST,
  SESSION_SUCCESS,
  SESSION_FAILURE,
} from './types';
import { API_KEY } from '../../utils/resources';

export function getToken() {
  return dispatch => {
    dispatch({ type: TOKEN_REQUEST });
    const tokenUrl =
      'https://api.themoviedb.org/3/authentication/token/new?api_key=';
    axios
      .get(`${tokenUrl}${API_KEY}`)
      .then(response => {
        const requestToken = response.data.request_token;
        dispatch({ type: TOKEN_SUCCESS });
        if (requestToken) {
          window.location.replace(
            `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.href}/auth`,
          );
        }
      })
      .catch(error => {
        dispatch({ type: TOKEN_FAILURE, error });
      });
  };
}

export function getSession(requestToken) {
  return dispatch => {
    dispatch({ type: SESSION_REQUEST });
    const url =
      'https://api.themoviedb.org/3/authentication/session/new?api_key=';
    axios
      .post(`${url}${API_KEY}`, {
        request_token: requestToken,
      })
      .then(response => {
        const sessionId = response.data.session_id;
        dispatch({
          type: SESSION_SUCCESS,
          payload: { sessionId, guest: false },
        });
        setAuth(sessionId, false);
      })
      .catch(error => {
        dispatch({ type: SESSION_FAILURE, error });
      });
  };
}

export function getGuestSession() {
  return dispatch => {
    dispatch({ type: SESSION_REQUEST });
    const url =
      'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=';
    axios
      .get(`${url}${API_KEY}`)
      .then(response => {
        const sessionId = response.data.guest_session_id;
        dispatch({
          type: SESSION_SUCCESS,
          payload: { sessionId, guest: true },
        });
        setAuth(sessionId, true);
      })
      .catch(error => {
        dispatch({ type: SESSION_FAILURE, error });
      });
  };
}

export function logoutUser() {
  return (dispatch, getState) => {
    dispatch({ type: LOGOUT_REQUEST });
    const { sessionId } = getState().auth;
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
