import fetchData from '../../utils/fetchData';
import { SET_LISTS, SET_TV_SHOWS } from './types';

export const fetchLists = urls => fetchData(urls, SET_LISTS);

export const fetchTvShows = urls => fetchData(urls, SET_TV_SHOWS);
