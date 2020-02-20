import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './types';
import store from '../store';

export function addNotification(message) {
  const ts = Date.now();
  setTimeout(() => store.dispatch(removeNotification(ts)), 5500);
  return { type: ADD_NOTIFICATION, payload: { ts, message } };
}

export function removeNotification(ts) {
  return { type: REMOVE_NOTIFICATION, payload: ts };
}
