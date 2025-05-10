import { Atom, atom } from 'jotai';
import { getMovieByIdQuery } from '@/infrastructure/repositories/movie';
import { Movie } from 'domain/movie';
import { TVSeries } from 'domain/tv-series';
import { getTvSeriesByIdQuery } from '@/infrastructure/repositories/tv-series';


export const seriesId$ = atom<TVSeries['id'] | null>(null);

export const show$: Atom<Promise<TVSeries | undefined>> = atom(async (get, {signal}) => {
  const id = get(seriesId$); 

  if (!id) {
    return undefined; 
  }

  try {
    const response = await getTvSeriesByIdQuery(signal, id)
    return response; 
  } catch (error) {
    console.error('Error fetching movie details', error);
    return undefined;
  }
});
