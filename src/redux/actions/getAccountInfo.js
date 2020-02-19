import axios from 'axios';
import {
  ACCOUNT_INFO_REQUEST,
  ACCOUNT_INFO_SUCCESS,
  ACCOUNT_INFO_FAILURE,
} from './types';
import { API_KEY } from '../../utils/resources';

export const getAccountInfo = () => async (dispatch, getState) => {
  const { sessionId, guest } = getState().auth;
  dispatch({ type: ACCOUNT_INFO_REQUEST });
  try {
    const urls = guest
      ? {
          ratedMovies: `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${API_KEY}`,
          ratedTv: `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/tv?api_key=${API_KEY}`,
        }
      : {
          details: `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${sessionId}`,
          ratedMovies: `https://api.themoviedb.org/3/account/{account_id}/rated/movies?api_key=${API_KEY}&session_id=${sessionId}`,
          ratedTv: `https://api.themoviedb.org/3/account/{account_id}/rated/tv?api_key=${API_KEY}&session_id=${sessionId}`,
          favoriteMovies: `https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}`,
          favoriteTv: `https://api.themoviedb.org/3/account/{account_id}/favorite/tv?api_key=${API_KEY}&session_id=${sessionId}`,
          watchlistMovies: `https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionId}`,
          watchlistTv: `https://api.themoviedb.org/3/account/{account_id}/watchlist/tv?api_key=${API_KEY}&session_id=${sessionId}`,
        };
    const respTuple = async ([name, url]) => [
      name,
      (await axios.get(url)).data,
    ];
    const resp = await Promise.all(Object.entries(urls).map(respTuple));
    dispatch({
      type: ACCOUNT_INFO_SUCCESS,
      payload: Object.fromEntries(resp),
    });
  } catch (error) {
    dispatch({ type: ACCOUNT_INFO_FAILURE, error });
  }
};
