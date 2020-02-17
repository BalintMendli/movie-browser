import { shape, number, string, object, arrayOf } from 'prop-types';

export const movieType = shape({
  id: number.isRequired,
  title: string.isRequired,
  backdrop_path: string,
  tagline: string,
  genres: arrayOf(shape({ name: string })).isRequired,
  vote_average: number.isRequired,
});

export const tvType = shape({
  id: number.isRequired,
  name: string.isRequired,
  backdrop_path: string,
  tagline: string,
  genres: arrayOf(shape({ name: string })).isRequired,
  vote_average: number.isRequired,
});

export const personType = shape({
  id: number.isRequired,
  name: string.isRequired,
  gender: number.isRequired,
  biography: string.isRequired,
  imdb_id: string.isRequired,
  birthday: string,
  place_of_birth: string,
  also_known_as: arrayOf(string).isRequired,
  combined_credits: shape({ cast: arrayOf(object) }),
});
