import {useRoute, useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {GenericSection, GenericSectionItem, useTheme} from '../../components';
import {RootRouteProps} from '../../navigation';
import {usePerson, usePersonCredits} from '../../network';
import {Theme} from '../../themes';
import Header from './Header';

const styles = (theme: Theme | undefined) =>
  StyleSheet.create({
    container: {
      alignItems: 'stretch',
      justifyContent: 'center',
      backgroundColor: theme?.colors.background0,
    },
    header: {alignItems: 'stretch'},
  });

export default function PersonScreen() {
  const route = useRoute<RootRouteProps<'Person'>>();
  const navigation = useNavigation<any>();
  const {loading, error, person} = usePerson(route.params.id);
  const {personCredits} = usePersonCredits(route.params.id);

  const average = (arr: number[]) =>
    arr.reduce((a, b) => a + b, 0) / arr.length;
  const voteAverage = average(
    personCredits ? personCredits?.cast.map(c => c.vote_average) : [],
  );

  const castItems = personCredits
    ? personCredits.cast.map(c => {
        return {
          id: c.id,
          title: c.title,
          imagePath: c.poster_path,
          subTitle: c.character,
        };
      })
    : [];
  const crewItems = personCredits
    ? personCredits.crew.map(c => {
        return {
          id: c.id,
          title: c.name,
          imagePath: c.profile_path,
          subTitle: c.job,
        };
      })
    : [];

  const theme = useTheme();
  const baseStyles = styles(theme);

  if (loading || error || !person) {
    return <></>;
  }

  const onMoviePress = (item: GenericSectionItem) => {
    navigation.push('Movie' as never, {id: item.id} as never);
  };

  return (
    <View style={baseStyles.container}>
      <ScrollView>
        <>
          <Header person={person} voteAverage={voteAverage} />
          <GenericSection
            items={castItems}
            title="Cast"
            onPress={onMoviePress}
          />
          <GenericSection
            items={crewItems}
            title="Crew"
            onPress={onMoviePress}
          />
        </>
      </ScrollView>
    </View>
  );
}
