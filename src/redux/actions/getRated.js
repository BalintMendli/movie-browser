import axios from 'axios';
import { RATED_REQUEST, RATED_SUCCESS, RATED_FAILURE } from './types';
import { getDetailsUrl } from '../../utils/resources';
import { getAuthInfo } from '../../utils/storage';

const API_KEY = process.env.REACT_APP_API_KEY;

export const getRated = () => async dispatch => {
  dispatch({
    type: RATED_REQUEST,
    loading: true,
    error: null,
  });
  try {
    const authInfo = getAuthInfo();
    const { sessionId } = authInfo;
    const movieUrl = authInfo.guest
      ? `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${API_KEY}`
      : `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${sessionId}`;
    const tvUrl = authInfo.guest
      ? `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${API_KEY}`
      : `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${sessionId}`;
    const [movies, tv] = await Promise.all([movieUrl, tvUrl].map(axios.get));
    console.log(movies, tv);
    dispatch({
      type: RATED_SUCCESS,
      ratedMovies: movies.data.results,
      ratedTv: tv.data.results,
      loading: false,
    });
  } catch (error) {
    dispatch({ type: RATED_FAILURE, error, loading: false });
  }
};