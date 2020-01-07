import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import { SET_DETAILS, DETAILS_ERROR, DETAILS_REQUEST } from './types';
import { getDetailsUrl } from '../../utils/resources';

export const fetchDetails = ({ id, mediaType }) => async dispatch => {
  dispatch(
    batchActions([
      { type: DETAILS_REQUEST, value: true, mediaType },
      { type: DETAILS_ERROR, error: null },
    ]),
  );
  try {
    const url = getDetailsUrl(mediaType, id);
    const response = (await axios.get(url)).data;
    dispatch(
      batchActions([
        { type: SET_DETAILS, response, mediaType },
        { type: DETAILS_REQUEST, value: false, mediaType },
      ]),
    );
  } catch (error) {
    dispatch(
      batchActions([
        { type: DETAILS_ERROR, error },
        { type: DETAILS_REQUEST, value: false, mediaType },
      ]),
    );
  }
};
