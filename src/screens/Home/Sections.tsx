import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {View, ViewStyle} from 'react-native';
import {PosterSection} from '../../components';
import {Movie} from '../../models/Movie';
import {MovieGenre, useDiscoverMovies} from '../../network';

export interface SectionProps {
  style?: ViewStyle;
}

export default function Sections({style}: SectionProps) {
  const navigation = useNavigation<any>();

  const moviesActionQuery = useDiscoverMovies(
    {
      attribute: 'vote_average',
      order: 'asc',
    },
    undefined,
    [MovieGenre.ACTION],
  );

  const movies90Query = useDiscoverMovies(
    {
      attribute: 'vote_average',
      order: 'asc',
    },
    {start: moment('1990-01-01').toDate(), end: moment('1999-12-31').toDate()},
  );

  const movies80Query = useDiscoverMovies(
    {
      attribute: 'vote_average',
      order: 'asc',
    },
    {start: moment('1980-01-01').toDate(), end: moment('1989-12-31').toDate()},
  );

  const moviesComedyQuery = useDiscoverMovies(
    {
      attribute: 'vote_average',
      order: 'asc',
    },
    undefined,
    [MovieGenre.COMEDY],
  );

  const onMoviePress = (movie: Movie) => {
    navigation.push('Movie' as never, {id: movie.id} as never);
  };

  return (
    <View style={style}>
      <PosterSection
        title="Worst action movies"
        query={moviesActionQuery}
        onPress={onMoviePress}
      />
      <PosterSection
        title="Worst 90's movies"
        query={movies90Query}
        onPress={onMoviePress}
      />
      <PosterSection
        title="Worst 80's movies"
        query={movies80Query}
        onPress={onMoviePress}
      />
      <PosterSection
        title="Worst comedy movies"
        query={moviesComedyQuery}
        onPress={onMoviePress}
      />
    </View>
  );
}
