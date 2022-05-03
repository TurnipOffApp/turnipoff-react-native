import {Genre} from './Genre';

export interface Movie {
  poster_path: string;
  release_date: string;
  id: number;
  title: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
  genres: Genre[];
  runtime: number | undefined;
  overview: string | undefined;
}
