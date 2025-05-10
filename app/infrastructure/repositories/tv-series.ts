import { createAPIUrl } from '@/utils';
import { TVSeries } from 'domain/tv-series';

const apiUrl = createAPIUrl();


export async function findTvSeriesMatchingQuery(
  params: Record<string, string | number>
): Promise<TVSeries[]> {
  const url = new URL('/tv-series', apiUrl);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value.toString());
  }

  const request = await fetch(url);
  if (!request.ok) return [];

  return await request.json() as TVSeries[];
}

export async function getTvSeriesByIdQuery(
    signal: AbortSignal,
    id: TVSeries['id'],
): Promise<TVSeries | undefined> {
  const url = new URL(`/tv-series/${id}`, apiUrl);

  const request = await fetch(url, { signal });
  if (!request.ok) throw new Error('Failed to fetch movie details');

  return (await request.json()) as TVSeries;
}

export async function getFeaturedTvSeriesQuery(): Promise<TVSeries[]> {
  const url = new URL('/tv-series/recommended', apiUrl);

  const request = await fetch(url);
  if (!request.ok) return [];

  return await request.json() as TVSeries[];
}

export async function getTopRatedTvSeriesQuery(): Promise<TVSeries[]> {
  const url = new URL('/tv-series', apiUrl);
  const request = await fetch(url);
  if (!request.ok) return [];

  const json = await request.json();

  return json.filter((it: TVSeries) => it.rating > 75);
}
