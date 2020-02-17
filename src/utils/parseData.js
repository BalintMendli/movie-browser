const parseMovie = ({
  id,
  title,
  vote_average: rating,
  poster_path: pic,
  backdrop_path: bgPic,
}) => ({
  id,
  title,
  rating,
  pic,
  bgPic,
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

const parsePerson = ({ id, name, profile_path: pic, known_for: knownFor }) => ({
  id,
  name,
  pic,
  knownFor,
});

export const parseLists = obj =>
  Object.keys(obj).reduce((retObj, key) => {
    let parser;
    if (key.includes('Movie')) parser = parseMovie;
    if (key.includes('Tv')) parser = parseTvShow;
    if (key.includes('Person')) parser = parsePerson;
    return Object.assign(retObj, { [key]: obj[key].map(parser) });
  }, {});
