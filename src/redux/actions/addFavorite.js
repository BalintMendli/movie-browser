import axios from 'axios';
import {
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_REQUEST,
  ADD_FAVORITE_FAILURE,
} from './types';
import { getDetailsUrl } from '../../utils/resources';

export const addFavorite = ({ id, mediaType }) => async dispatch => {
  dispatch({ type: ADD_FAVORITE_REQUEST, loading: true });
  try {
    const url = `https://api.themoviedb.org/3/account/favorite?api_key=`;
    const data = { media_type: mediaType, media_id: id, favorite: true };
    const options = {
      url,
      data,
      headers: { 'content-type': 'application/json;charset=utf-8' },
    };
    const response = (await axios.post(options)).data;
    console.log(response);
    dispatch({ type: ADD_FAVORITE_SUCCESS, loading: false });
  } catch (error) {
    dispatch({ type: ADD_FAVORITE_FAILURE, error });
  }
};
