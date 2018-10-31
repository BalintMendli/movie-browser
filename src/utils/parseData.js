const parseMovie = ({ id, poster_path: pic, title, vote_average: rating }) => ({
  id,
  pic,
  title,
  rating,
});

const parseTvShow = ({
  id,
  poster_path: pic,
  name: title,
  vote_average: rating,
}) => ({
  id,
  pic,
  title,
  rating,
});

export const parseLists = obj =>
  Object.keys(obj).reduce((retObj, key) => {
    let parser;
    if (key.includes('Movie')) parser = parseMovie;
    if (key.includes('Tv')) parser = parseTvShow;
    return Object.assign(retObj, { [key]: obj[key].map(parser) });
  }, {});
