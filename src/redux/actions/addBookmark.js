import axios from 'axios';
import {
  ADD_BOOKMARK_SUCCESS,
  ADD_BOOKMARK_REQUEST,
  ADD_BOOKMARK_FAILURE,
} from './types';
import { API_KEY } from '../../utils/resources';
import { addNotification } from './notifications';

const addBookmark = ({ id, mediaType, watchlist }) => async (
  dispatch,
  getState,
) => {
  const { sessionId, guest } = getState().auth;
  if (!sessionId || guest) {
    dispatch(addNotification('Please sign in with your TMDB account!'));
    return;
  }
  dispatch({ type: ADD_BOOKMARK_REQUEST, loading: true });
  try {
    const url = `https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`;
    const data = { media_type: mediaType, media_id: id, watchlist };
    const options = {
      url,
      data,
      method: 'post',
      headers: { 'content-type': 'application/json;charset=utf-8' },
    };
    const response = (await axios(options)).data;
    console.log(response);
    dispatch({ type: ADD_BOOKMARK_SUCCESS, loading: false, watchlist });
  } catch (error) {
    dispatch({ type: ADD_BOOKMARK_FAILURE, error });
  }
};

export default addBookmark;
