import { SET_LISTS } from '../actions/types';
import { parseLists } from '../../utils/parseData';

const initialState = {
  popularMovie: [],
  nowPlayingMovie: [],
  topRatedMovie: [],
  upcomingMovie: [],
  popularTv: [],
  topRatedTv: [],
  onTheAirTv: [],
  airingTodayTv: [],
  popularPerson: [],
};

export default function lists(state = initialState, action) {
  const { type, respObj } = action;
  switch (type) {
    case SET_LISTS:
      return { ...state, ...parseLists(respObj) };
    default:
      return state;
  }
}
