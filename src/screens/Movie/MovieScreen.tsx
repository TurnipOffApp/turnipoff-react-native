import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {GenericSection, useTheme} from '../../components';
import {GenericSectionItem} from '../../components/GenericSection';
import {RootRouteProps} from '../../navigation';
import {useMovie, useMovieCredits} from '../../network';
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

export default function MovieScreen() {
  const route = useRoute<RootRouteProps<'Movie'>>();
  const navigation = useNavigation<any>();
  const {loading, error, movie} = useMovie(route?.params.id);
  const {movieCredits} = useMovieCredits(route?.params.id);
  const castItems = movieCredits
    ? movieCredits.cast.map(c => {
        return {
          id: c.id,
          title: c.name,
          imagePath: c.profile_path,
          subTitle: c.character,
        };
      })
    : [];
  const crewItems = movieCredits
    ? movieCredits.crew.map(c => {
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

  if (loading || error || !movie) {
    return <></>;
  }

  const onPersonPress = (item: GenericSectionItem) => {
    navigation.push('Person' as never, {id: item.id} as never);
  };

  return (
    <View style={baseStyles.container}>
      <ScrollView>
        <>
          <Header movie={movie} />
          <GenericSection
            items={castItems}
            title="Cast"
            onPress={onPersonPress}
          />
          <GenericSection
            items={crewItems}
            title="Crew"
            onPress={onPersonPress}
          />
        </>
      </ScrollView>
    </View>
  );
}
