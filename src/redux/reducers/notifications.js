import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../actions/types';

export function notifications(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_NOTIFICATION:
      return [...state, payload];
    case REMOVE_NOTIFICATION:
      return state.filter(n => n.ts !== payload);
    default:
      return state;
  }
}
