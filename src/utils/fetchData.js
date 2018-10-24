import axios from 'axios';

export default async function fetchData(urls) {
  let resp = [];
  try {
    resp = await Promise.all(urls.map(axios.get));
  } catch (error) {
    return { error };
  }
  console.log(urls, resp);
  return { resp: resp.map(r => r.data), error: null };
}
