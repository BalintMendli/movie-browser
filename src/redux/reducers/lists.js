import { SET_LISTS, LOADING, ERROR } from '../actions/types';
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

export function lists(state = initialState, action) {
  const { type, respObj } = action;
  switch (type) {
    case SET_LISTS:
      return { ...state, ...parseLists(respObj) };
    default:
      return state;
  }
}

export function listsError(state = null, action) {
  switch (action.type) {
    case ERROR:
      return action.error;
    default:
      return state;
  }
}
export function listsIsLoading(state = false, action) {
  switch (action.type) {
    case LOADING:
      return action.value;
    default:
      return state;
  }
}
