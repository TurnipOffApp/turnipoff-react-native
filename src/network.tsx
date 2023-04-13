import {useEffect, useState} from 'react';
import {TMDB_API_KEY, TMDB_API_BASE_URL} from './config';
import {Movie} from './models/Movie';
import {MoviesResult} from './models/MoviesResult';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment';
import {MovieCredits} from './models/MovieCredits';
import {Person} from './models/Person';

const locale = RNLocalize.getLocales()[0];

export enum MovieGenre {
  ACTION = '28',
  ADVENTURE = '12',
  COMEDY = '35',
  CRIME = '80',
  DOCUMENTARY = '99',
  DRAME = '28',
  FAMILY = '14',
  FANTASY = '14',
  HORROR = '27',
}

export interface SortBy {
  attribute: string;
  order: 'asc' | 'desc';
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface MovieQuery {
  movies?: Movie[];
  error?: Error;
  loading: boolean;
  loadMore: () => void;
}

export const useQuery = <TData,>(url?: string, params?: URLSearchParams) => {
  const [result, setResult] = useState<TData | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const fetchData = async () => {
    try {
      setLoading(true);

      let parameters = params ? params : new URLSearchParams();
      parameters.append('api_key', TMDB_API_KEY);
      parameters.append('language', locale.languageCode);
      parameters.append('region', 'US');

      const response = await fetch(`${url}?${parameters.toString()}`);
      const json = await response.json();
      setResult(json as TData);
      setLoading(false);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      } else {
        setError(Error(e as string));
      }
    }
  };

  useEffect(() => {
    if (!url) {
      return;
    }
    if (!result && !error) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return {loading, error, result};
};

export const useMovie = (id?: number) => {
  const {loading, error, result} = useQuery<Movie>(
    id ? `${TMDB_API_BASE_URL}/movie/${id}` : undefined,
  );
  return {loading, error, movie: result};
};

export const useMovieCredits = (id?: number) => {
  const {loading, error, result} = useQuery<MovieCredits>(
    id ? `${TMDB_API_BASE_URL}/movie/${id}/credits` : undefined,
  );
  return {loading, error, movieCredits: result};
};

export const usePerson = (id?: number) => {
  const {loading, error, result} = useQuery<Person>(
    id ? `${TMDB_API_BASE_URL}/person/${id}` : undefined,
  );
  return {loading, error, person: result};
};

export const usePersonCredits = (id?: number) => {
  const {loading, error, result} = useQuery<MovieCredits>(
    id ? `${TMDB_API_BASE_URL}/person/${id}/movie_credits` : undefined,
  );
  return {loading, error, personCredits: result};
};

export const useMoviesQuery = (
  url: string,
  sortBy: SortBy,
  releaseDate?: DateRange,
  genres?: MovieGenre[],
): MovieQuery => {
  const [result, setResult] = useState<MoviesResult | undefined>(undefined);
  const [movies, setMovies] = useState<Movie[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [page, setPage] = useState(0);

  const loadMore = async () => {
    if (loading) {
      return;
    }

    if (result && result.total_pages < page + 1) {
      return;
    }

    try {
      setLoading(true);
      let params = new URLSearchParams({
        page: (page + 1).toString(),
        api_key: TMDB_API_KEY,
        sort_by: `${sortBy.attribute}.${sortBy.order}`,
        adult: 'false',
        language: locale.languageCode,
        region: 'US',
        'vote_count.gte': '25',
      });
      if (genres) {
        params.append('with_genres', genres?.join(','));
      }
      if (releaseDate) {
        params.append(
          'release_date.gte',
          moment(releaseDate.start).format('YYYY-MM-DD'),
        );
        params.append(
          'release_date.lte',
          moment(releaseDate.end).format('YYYY-MM-DD'),
        );
      }
      const response = await fetch(`${url}?${params.toString()}`);
      const json = await response.json();
      const movieResult = json as MoviesResult;
      setResult(movieResult);
      setLoading(false);
      setPage(movieResult.page);

      if (!movies) {
        setMovies(movieResult.results);
      } else {
        setMovies([...movies, ...movieResult.results]);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      } else {
        setError(Error(e as string));
      }
    }
  };

  useEffect(() => {
    if (!result && !error) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {loading, error, movies, loadMore};
};

export const useDiscoverMovies = (
  sortBy: SortBy,
  releaseDate?: DateRange,
  genres?: MovieGenre[],
): MovieQuery => {
  return useMoviesQuery(
    `${TMDB_API_BASE_URL}/discover/movie`,
    sortBy,
    releaseDate,
    genres,
  );
};
