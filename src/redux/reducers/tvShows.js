import { SET_TV_SHOWS } from '../actions/types';
import { parseTvShows } from '../../utils/parseData';

const initialState = {
  popular: [],
  topRated: [],
  onTheAir: [],
  airingToday: [],
};

export default function tvShows(state = initialState, action) {
  const { type, respObj } = action;
  switch (type) {
    case SET_TV_SHOWS:
      return { ...state, ...parseTvShows(respObj) };
    default:
      return state;
  }
}
