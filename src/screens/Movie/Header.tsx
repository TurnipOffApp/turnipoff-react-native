import moment from 'moment';
import React from 'react';
import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {Poster, useTheme} from '../../components';
import {Movie} from '../../models/Movie';
import {Theme} from '../../themes';

const styles = (theme: Theme | undefined) =>
  StyleSheet.create({
    posterContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    },
    infoPanel: {
      borderTopWidth: 1,
      borderTopColor: theme?.colors.background1,
      borderBottomWidth: 1,
      borderBottomColor: theme?.colors.background1,
      padding: 12,
      flexDirection: 'row',
    },
    voteAverageContainer: {
      borderWidth: 2,
      borderRadius: 300,
      borderColor: theme?.colors.background2,
      height: 48,
      width: 48,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    voteAverage: {
      ...theme?.typos.title,
      color: theme?.colors.text,
    },
    title: {
      ...theme?.typos.title,
      color: theme?.colors.text,
      textAlign: 'right',
    },
    subTitle: {
      ...theme?.typos.small,
      color: theme?.colors.text,
      textAlign: 'right',
    },
    textInfoContainer: {
      alignItems: 'stretch',
      flex: 1,
    },
    overview: {
      padding: 12,
      color: theme?.colors.text,
      ...theme?.typos.normal,
    },
  });

export interface HeaderProps {
  movie: Movie;
  style?: ViewStyle;
}

export default function Header({movie, style}: HeaderProps) {
  const dimensions = useWindowDimensions();
  const theme = useTheme();
  const baseStyles = styles(theme);
  return (
    <View style={style}>
      <View style={baseStyles.posterContainer}>
        <Poster
          imagePath={movie.poster_path}
          height={dimensions.height / 4}
          format={'w342'}
        />
      </View>
      <View style={baseStyles.infoPanel}>
        <View style={baseStyles.voteAverageContainer}>
          <Text style={baseStyles.voteAverage}>
            {movie.vote_average.toFixed(1)}
          </Text>
        </View>
        <View style={baseStyles.textInfoContainer}>
          <Text style={baseStyles.title}>{movie.title}</Text>
          <Text style={baseStyles.subTitle}>
            {movie.genres.map(g => g.name).join(', ')}
          </Text>
          <Text style={baseStyles.subTitle}>
            {moment(movie.release_date).format('YYYY')}
          </Text>
          {movie.runtime && (
            <Text style={baseStyles.subTitle}>
              {moment
                .utc(moment.duration(movie.runtime, 'minutes').asMilliseconds())
                .format('H[h ]mm [mn]')}
            </Text>
          )}
        </View>
      </View>
      <Text style={baseStyles.overview}>{movie.overview}</Text>
    </View>
  );
}
