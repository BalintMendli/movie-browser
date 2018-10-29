import { SET_MOVIES } from '../actions/types';
import { parseMovies } from '../../utils/parseData';

const initialState = {
  popular: [],
  nowPlaying: [],
  topRated: [],
  upcoming: [],
};

export default function movies(state = initialState, action) {
  const { type, respObj } = action;
  switch (type) {
    case SET_MOVIES:
      return { ...state, ...parseMovies(respObj) };
    default:
      return state;
  }
}
