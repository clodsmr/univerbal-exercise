import { Atom, atom } from 'jotai';
import { Movie } from '../../../domain/movie';
import { getFeaturedMoviesQuery } from '@/infrastructure/repositories/movie';

export const movies$: Atom<Promise<Movie[]>> = atom(async (get, { signal }) => {
  try {
    const response = await getFeaturedMoviesQuery(signal);
    console.log('res', response);
    return response;
  } catch (error) {
    console.error(error);
    return []; 
  }
});
