import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, ViewStyle} from 'react-native';
import {PosterCarousel} from '../../components';
import {useDiscoverMovies} from '../../network';

export interface TrendingProps {
  style?: ViewStyle;
}

export default function Trending({style}: TrendingProps) {
  const {loading, error, movies} = useDiscoverMovies({
    attribute: 'vote_average',
    order: 'asc',
  });
  const navigation = useNavigation<any>();
  const trendingMovies = movies
    ? movies.length > 0
      ? movies.slice(0, 6)
      : movies
    : [];

  if (loading || error) {
    return <></>;
  }

  return (
    <Pressable
      style={style}
      onPress={() => {
        // Ugly work around to allow navigation for automated testing
        navigation.push('Movie' as never, {id: 116977} as never);
      }}>
      <PosterCarousel
        movies={trendingMovies}
        onPress={movie => {
          navigation.push('Movie' as never, {id: movie.id} as never);
        }}
      />
    </Pressable>
  );
}
