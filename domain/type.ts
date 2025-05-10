import { Movie } from "./movie";
import { TVSeries } from "./tv-series";

export type RootStackParamList = {
  MovieDetails: { id: string, movie: Movie }; 
  TvSeriesDetails: { id: string, series: TVSeries }; 
};