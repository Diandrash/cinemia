import { MovieAPIResponse } from '@/types/movie';
import { MovieDetail } from '@/types/movie.detail';
import { ReviewAPIResponse } from '@/types/review';
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

export async function getPlayingMovies(params?: any) {
  return await moviedb
    .get('/3/movie/now_playing', { params })
    .then((res) => res.data as MovieAPIResponse);
}

export async function getTopMovies(params?: any) {
  return await moviedb
    .get('/3/movie/top_rated', { params })
    .then((res) => res.data as MovieAPIResponse);
}

export async function getUpcomingMovies(params?: any) {
  return await moviedb
    .get('/3/movie/upcoming', { params })
    .then((res) => res.data as MovieAPIResponse);
}

export async function getMovieDetail(movieId: string, params?: any) {
  return await moviedb
    .get(`/3/movie/${movieId}`, { params })
    .then((res) => res.data as MovieDetail);
}

export async function getMovieReviews(movieId: string, params?: any) {
  return await moviedb
    .get(`/3/movie/${movieId}/reviews`, { params })
    .then((res) => res.data as ReviewAPIResponse);
}
