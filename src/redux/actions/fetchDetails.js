import axios from 'axios';
import { DETAILS_SUCCESS, DETAILS_ERROR, DETAILS_REQUEST } from './types';
import { getDetailsUrl } from '../../utils/resources';

export const fetchDetails = ({ id, mediaType }) => async (
  dispatch,
  getState,
) => {
  dispatch({ type: DETAILS_REQUEST });
  try {
    const { sessionId } = getState().auth;
    const url = getDetailsUrl(mediaType, id, sessionId);
    const response = (await axios.get(url)).data;
    dispatch({ type: DETAILS_SUCCESS, response, mediaType });
  } catch (error) {
    dispatch({ type: DETAILS_ERROR, error });
  }
};
