import axios from 'axios';
import { RATED_REQUEST, RATED_SUCCESS, RATED_FAILURE } from './types';
import { getDetailsUrl, API_KEY } from '../../utils/resources';
import { getAuthInfo } from '../../utils/storage';

export const getRated = () => async dispatch => {
  dispatch({ type: RATED_REQUEST });
  try {
    const authInfo = getAuthInfo();
    const { sessionId, guest } = authInfo;
    const movieUrl = guest
      ? `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${API_KEY}`
      : `https://api.themoviedb.org/3/account/{account_id}/rated/movies?api_key=${API_KEY}&session_id=${sessionId}`;
    const tvUrl = guest
      ? `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${API_KEY}`
      : `https://api.themoviedb.org/3/account/{account_id}/rated/tv?api_key=${API_KEY}&session_id=${sessionId}`;
    const [movies, tv] = await Promise.all([movieUrl, tvUrl].map(axios.get));
    dispatch({
      type: RATED_SUCCESS,
      ratedMovies: movies.data.results,
      ratedTv: tv.data.results,
    });
  } catch (error) {
    dispatch({ type: RATED_FAILURE, error });
  }
};
