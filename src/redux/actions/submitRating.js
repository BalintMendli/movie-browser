import axios from 'axios';
import {
  SUBMIT_RATING_SUCCESS,
  SUBMIT_RATING_REQUEST,
  SUBMIT_RATING_FAILURE,
} from './types';
import { API_KEY } from '../../utils/resources';
import { getSessionId } from '../../utils/storage';

export const submitRating = ({ id, mediaType, rating }) => async dispatch => {
  dispatch({ type: SUBMIT_RATING_REQUEST, value: true });
  console.log(id, rating);
  try {
    const url = `https://api.themoviedb.org/3/${mediaType}/${id}/rating?api_key=${API_KEY}&session_id=${getSessionId()}`;
    const data = { value: rating };
    const options = {
      url,
      data,
      method: 'post',
      headers: { 'content-type': 'application/json;charset=utf-8' },
    };
    const response = (await axios(options)).data;
    console.log(response);
    dispatch({ type: SUBMIT_RATING_SUCCESS });
  } catch (error) {
    dispatch({ type: SUBMIT_RATING_FAILURE, error });
  }
};
