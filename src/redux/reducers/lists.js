import { LISTS_REQUEST, LISTS_SUCCESS, LISTS_ERROR } from '../actions/types';
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
  loading: false,
  error: null,
};

export function lists(state = initialState, action) {
  const { type, respObj } = action;
  switch (type) {
    case LISTS_REQUEST:
      return { ...state, loading: true, error: null };
    case LISTS_SUCCESS:
      return { ...state, ...parseLists(respObj), loading: false };
    case LISTS_ERROR:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
}
