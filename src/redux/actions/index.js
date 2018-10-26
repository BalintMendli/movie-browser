import fetchData from '../../utils/fetchData';
import { SET_MOVIES, SET_TV_SHOWS } from './types';

export const fetchMovies = urls => fetchData(urls, SET_MOVIES);

export const getTvShows = urls => fetchData(urls, SET_TV_SHOWS);
