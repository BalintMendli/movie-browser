import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import {
  SUBMIT_RATING_SUCCESS,
  SUBMIT_RATING_REQUEST,
  SUBMIT_RATING_FAILURE,
} from './types';
import { getDetailsUrl } from '../../utils/resources';

export const submitRating = ({ id, mediaType, rating }) => async dispatch => {
  dispatch(
    batchActions([
      { type: SUBMIT_RATING_REQUEST, value: true },
      { type: SUBMIT_RATING_FAILURE, error: null },
    ]),
  );
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}/rating}`;
    const data = { value: rating };
    const options = {
      url,
      data,
      headers: { 'content-type': 'application/json;charset=utf-8' },
    };
    const response = (await axios.post(options)).data;
    console.log(response);
    dispatch(
      batchActions([
        { type: SUBMIT_RATING_SUCCESS, value: true },
        { type: SUBMIT_RATING_REQUEST, value: false },
      ]),
    );
  } catch (error) {
    dispatch(
      batchActions([
        { type: SUBMIT_RATING_FAILURE, error },
        { type: SUBMIT_RATING_REQUEST, value: false },
      ]),
    );
  }
};
