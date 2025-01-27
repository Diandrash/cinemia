import { MovieAPIResponse } from '@/types/movie';
import axios from 'axios';
// import { BASE_URL, API_KEY } from '@env';

const baseURL = process.env.EXPO_PUBLIC_BASE_URL;
// const baseURL = BASE_URL;

export const moviedb = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
  },
});

export async function getPopularMovies(params?: any) {
  return await moviedb
    .get('/3/movie/popular', { params })
    .then((res) => res.data as MovieAPIResponse);
}
