import axios from 'axios';
import { LISTS_REQUEST, LISTS_SUCCESS, LISTS_ERROR } from './types';
import { getUrl } from '../../utils/resources';

export const fetchLists = categories => async dispatch => {
  dispatch({ type: LISTS_REQUEST });
  try {
    const urls = getUrls(categories);
    const respTuple = async ([cat, url]) => [
      cat,
      (await axios.get(url)).data.results,
    ];
    const response = await Promise.all(urls.map(respTuple));
    const respObj = Object.fromEntries(response);
    dispatch({ type: LISTS_SUCCESS, respObj });
  } catch (error) {
    dispatch({ type: LISTS_ERROR, error });
  }
};

const getUrls = categories =>
  Object.keys(categories)
    .filter(cat => !categories[cat] || !categories[cat].length)
    .map(cat => [cat, getUrl(cat)]);
