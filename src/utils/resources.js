const API_URL = 'https://api.themoviedb.org';
const VERSION = '3';
const API_KEY = process.env.REACT_APP_API_KEY;

const getUrl = ({ media, resource, id, append }) =>
  `${API_URL}/${VERSION}/${media}/${resource}/${id}?api_key=${API_KEY}&append_to_response=${append}`;
