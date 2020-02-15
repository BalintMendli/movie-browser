import axios from 'axios';
import { DETAILS_SUCCESS, DETAILS_ERROR, DETAILS_REQUEST } from './types';
import { getDetailsUrl } from '../../utils/resources';
import { getSessionId } from '../../utils/storage';

export const fetchDetails = ({ id, mediaType }) => async dispatch => {
  dispatch({ type: DETAILS_REQUEST });
  try {
    const url = getDetailsUrl(mediaType, id, getSessionId());
    const response = (await axios.get(url)).data;
    dispatch({ type: DETAILS_SUCCESS, response, mediaType });
  } catch (error) {
    dispatch({ type: DETAILS_ERROR, error });
  }
};
