import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import {
  GET_RATING_REQUEST,
  GET_RATING_SUCCESS,
  GET_RATING_FAILURE,
} from './types';
import { getDetailsUrl } from '../../utils/resources';

export const submitRating = ({ id, mediaType, rating }) => async dispatch => {
  dispatch(
    batchActions([
      { type: GET_RATING_REQUEST, value: true },
      { type: GET_RATING_FAILURE, error: null },
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
    const response = (await axios(options)).data;
    console.log(response);
    dispatch(
      batchActions([
        { type: GET_RATING_SUCCESS, rating: response },
        { type: GET_RATING_REQUEST, value: false },
      ]),
    );
  } catch (error) {
    dispatch(
      batchActions([
        { type: GET_RATING_FAILURE, error },
        { type: GET_RATING_REQUEST, value: false },
      ]),
    );
  }
};
