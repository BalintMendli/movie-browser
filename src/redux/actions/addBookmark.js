import axios from 'axios';
import {
  ADD_BOOKMARK_SUCCESS,
  ADD_BOOKMARK_REQUEST,
  ADD_BOOKMARK_FAILURE,
} from './types';
import { getDetailsUrl } from '../../utils/resources';

export const addFavorite = ({ id, mediaType }) => async dispatch => {
  dispatch({ type: ADD_BOOKMARK_REQUEST, loading: true });
  try {
    const url = `https://api.themoviedb.org/3/account/watchlist?api_key=`;
    const data = { media_type: mediaType, media_id: id, watchlist: true };
    const options = {
      url,
      data,
      headers: { 'content-type': 'application/json;charset=utf-8' },
    };
    const response = (await axios.post(options)).data;
    console.log(response);
    dispatch({ type: ADD_BOOKMARK_SUCCESS, loading: false });
  } catch (error) {
    dispatch({ type: ADD_BOOKMARK_FAILURE, error });
  }
};
