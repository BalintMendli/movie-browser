const API_URL = 'https://api.themoviedb.org';
const VERSION = '3';
const API_KEY = process.env.REACT_APP_API_KEY;

const toSnake = str =>
  str
    .split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase();

export const getUrl = ({ media, category, id, appends }) => {
  let url = `${API_URL}/${VERSION}/${media}/${toSnake(category)}`;
  if (id) url += `/${id}`;
  url += `?api_key=${API_KEY}`;
  if (appends && appends.length)
    url += `&append_to_response=${appends.join(',')}`;
  return url;
};

export const getMoviesUrl = category => getUrl({ media: 'movie', category });
