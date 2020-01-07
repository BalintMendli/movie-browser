import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import { SET_LISTS, LISTS_ERROR, LISTS_REQUEST } from './types';
import { getUrl } from '../../utils/resources';

export const fetchLists = categories => async dispatch => {
  dispatch(
    batchActions([
      { type: LISTS_REQUEST, value: true },
      { type: LISTS_ERROR, error: null },
    ]),
  );
  try {
    const urls = getUrls(categories);
    const respTuple = async ([cat, url]) => [
      cat,
      (await axios.get(url)).data.results,
    ];
    const response = await Promise.all(urls.map(respTuple));
    const respObj = Object.fromEntries(response);
    dispatch(
      batchActions([
        { type: SET_LISTS, respObj },
        { type: LISTS_REQUEST, value: false },
      ]),
    );
  } catch (error) {
    dispatch(
      batchActions([
        { type: LISTS_ERROR, error },
        { type: LISTS_REQUEST, value: false },
      ]),
    );
  }
};

const getUrls = categories =>
  Object.keys(categories)
    .filter(cat => !categories[cat] || !categories[cat].length)
    .map(cat => [cat, getUrl(cat)]);
