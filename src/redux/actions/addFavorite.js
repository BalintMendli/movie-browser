import axios from 'axios';
import {
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_REQUEST,
  ADD_FAVORITE_FAILURE,
} from './types';
import { API_KEY } from '../../utils/resources';
import { getSessionId } from '../../utils/storage';

export const addFavorite = ({ id, mediaType, favorite }) => async dispatch => {
  dispatch({ type: ADD_FAVORITE_REQUEST, loading: true });
  try {
    const url = `https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=${API_KEY}&session_id=${getSessionId()}`;
    const data = { media_type: mediaType, media_id: id, favorite };
    const options = {
      url,
      data,
      method: 'post',
      headers: { 'content-type': 'application/json;charset=utf-8' },
    };
    const response = (await axios(options)).data;
    console.log(response);
    dispatch({ type: ADD_FAVORITE_SUCCESS, loading: false, favorite });
  } catch (error) {
    dispatch({ type: ADD_FAVORITE_FAILURE, error });
  }
};
