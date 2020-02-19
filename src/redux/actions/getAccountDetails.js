import axios from 'axios';
import {
  ACCOUNT_DETAILS_REQUEST,
  ACCOUNT_DETAILS_SUCCESS,
  ACCOUNT_DETAILS_FAILURE,
} from './types';
import { API_KEY } from '../../utils/resources';

export const getAccountDetails = () => async (dispatch, getState) => {
  const { sessionId } = getState().auth;
  dispatch({ type: ACCOUNT_DETAILS_REQUEST });
  try {
    const url = `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${sessionId}`;
    const resp = await axios.get(url);
    console.log(resp);
    dispatch({
      type: ACCOUNT_DETAILS_SUCCESS,
      details: resp.data,
    });
  } catch (error) {
    dispatch({ type: ACCOUNT_DETAILS_FAILURE, error });
  }
};
