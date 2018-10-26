import axios from 'axios';
import { SET_ERROR, LOADING_START } from '../redux/actions/types';
import { getMoviesUrl } from './resources';

export default (urls, actionType) => async dispatch => {
  dispatch({ type: LOADING_START });
  try {
    const respTuple = async category => ({
      [category]: (await axios.get(urls[category])).data.results,
    });
    const response = await Promise.all(Object.keys(urls).map(respTuple));
    const respObj = response.reduce((obj, cat) => Object.assign(obj, cat), {});
    dispatch({ type: actionType, respObj });
  } catch (error) {
    dispatch({ type: SET_ERROR, error });
  }
};

export const needFetch = categories =>
  Object.keys(categories).reduce(
    (obj, key) =>
      !categories[key] || !categories[key].length
        ? Object.assign(obj, { [key]: getMoviesUrl(key) })
        : obj,
    {}
  );
