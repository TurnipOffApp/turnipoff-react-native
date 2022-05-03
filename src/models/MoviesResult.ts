import {Movie} from './Movie';

export interface MoviesResult {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}
