import { SET_TV_SHOWS } from '../actions/types';

const initialState = {
  popularTv: [],
  topRatedTv: [],
  onTheAirTv: [],
  airingTodayTv: [],
};

export default function tvShows(state = initialState, action) {
  const { type, respObj } = action;
  switch (type) {
    case SET_TV_SHOWS:
      return { ...state, ...respObj };
    default:
      return state;
  }
}
