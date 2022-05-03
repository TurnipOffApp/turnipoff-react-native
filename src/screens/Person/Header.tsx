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
import {Person} from '../../models/Person';
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
    biography: {
      padding: 12,
      color: theme?.colors.text,
      ...theme?.typos.normal,
    },
    textInfoContainer: {
      alignItems: 'stretch',
      flex: 1,
    },
    subTitle: {
      ...theme?.typos.small,
      color: theme?.colors.text,
      textAlign: 'right',
    },
  });

export interface HeaderProps {
  person: Person;
  voteAverage: number;
  style?: ViewStyle;
}

export default function Header({person, style, voteAverage}: HeaderProps) {
  const dimensions = useWindowDimensions();
  const theme = useTheme();
  const baseStyles = styles(theme);
  return (
    <View style={style}>
      <View style={baseStyles.posterContainer}>
        <Poster
          imagePath={person.profile_path}
          height={dimensions.height / 3.2}
          format={'w342'}
        />
      </View>
      <View style={baseStyles.infoPanel}>
        <View style={baseStyles.voteAverageContainer}>
          <Text style={baseStyles.voteAverage}>{voteAverage.toFixed(1)}</Text>
        </View>
        <View style={baseStyles.textInfoContainer}>
          <Text style={baseStyles.title}>{person.name}</Text>
          <Text style={baseStyles.subTitle}>
            {moment(person.birthday).format('MMMM Do YYYY')}
          </Text>
          <Text style={baseStyles.subTitle}>{person.place_of_birth}</Text>
        </View>
      </View>
      <Text style={baseStyles.biography}>{person.biography}</Text>
    </View>
  );
}
