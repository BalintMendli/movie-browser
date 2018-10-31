import axios from 'axios';
import { SET_LISTS, SET_ERROR, LOADING_START } from '../redux/actions/types';
import { getUrl } from './resources';

export default urls => async dispatch => {
  dispatch({ type: LOADING_START });
  try {
    const respTuple = async category => ({
      [category]: (await axios.get(urls[category])).data.results,
    });
    const response = await Promise.all(Object.keys(urls).map(respTuple));
    const respObj = response.reduce((obj, cat) => Object.assign(obj, cat), {});
    console.log(respObj);
    dispatch({ type: SET_LISTS, respObj });
  } catch (error) {
    dispatch({ type: SET_ERROR, error });
  }
};

// export const getUrlsMovies = categories =>
//   Object.keys(categories).reduce(
//     (obj, key) =>
//       !categories[key] || !categories[key].length
//         ? Object.assign(obj, { [key]: moviesUrl(key) })
//         : obj,
//     {}
//   );

// export const getUrlsTvShows = categories =>
//   Object.keys(categories).reduce(
//     (obj, key) =>
//       !categories[key] || !categories[key].length
//         ? Object.assign(obj, { [key]: tvShowsUrl(key) })
//         : obj,
//     {}
//   );

export const getUrls = categories =>
  Object.keys(categories).reduce(
    (obj, key) =>
      !categories[key] || !categories[key].length
        ? Object.assign(obj, { [key]: getUrl(key) })
        : obj,
    {}
  );
