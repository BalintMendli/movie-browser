const API_URL = 'https://api.themoviedb.org';
const VERSION = '3';
const API_KEY = process.env.REACT_APP_API_KEY;

function buildUrl({ media, category, id, appends }) {
  let url = `${API_URL}/${VERSION}/${media}`;
  if (category) url += `/${category}`;
  if (id) url += `/${id}`;
  url += `?api_key=${API_KEY}`;
  if (appends && appends.length)
    url += `&append_to_response=${appends.join(',')}`;
  return url;
}

export function getUrl(input) {
  const split = input.split(/(?=[A-Z])/);
  const media = split.pop().toLowerCase();
  const category = split.join('_').toLowerCase();
  return buildUrl({ media, category });
}

export function getDetailsUrl(media, id) {
  let appends = [];
  if (media === 'movie' || media === 'tv')
    appends = ['videos', 'credits', 'reviews', 'similar'];
  if (media === 'person') appends = ['combined_credits'];
  return buildUrl({ media, id, appends });
}
