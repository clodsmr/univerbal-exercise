import { Atom, atom } from 'jotai';
import { getMovieByIdQuery } from '@/infrastructure/repositories/movie';
import { Movie } from 'domain/movie';
import { Opaque } from 'domain/utils';

type MovieId = Opaque<"movie-id", string>;
export const movieId$ = atom<MovieId | null>(null);

export const movie$: Atom<Promise<Movie | undefined>> = atom(async (get, {signal}) => {
  const id = get(movieId$); 

  if (!id) {
    return undefined; 
  }

  try {
    const response = await getMovieByIdQuery(signal, id)
    return response; 
  } catch (error) {
    console.error('Error fetching movie details', error);
    return undefined;
  }
});
