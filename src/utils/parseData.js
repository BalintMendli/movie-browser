const parseMovie = ({ id, poster_path: pic, title, vote_average: rating }) => ({
  id,
  pic,
  title,
  rating,
});

export const parseMovies = obj =>
  Object.keys(obj).reduce(
    (retObj, key) => Object.assign(retObj, { [key]: obj[key].map(parseMovie) }),
    {}
  );

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

export const parseTvShows = obj =>
  Object.keys(obj).reduce(
    (retObj, key) =>
      Object.assign(retObj, { [key]: obj[key].map(parseTvShow) }),
    {}
  );
