import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTheme} from '../../components';
import {Theme} from '../../themes';
import Sections from './Sections';
import Trending from './Trending';

const styles = (theme: Theme | undefined) =>
  StyleSheet.create({
    container: {
      alignItems: 'stretch',
      justifyContent: 'center',
      backgroundColor: theme?.colors.background0,
    },
    trending: {flex: 0.5},
    sections: {flex: 0.5, alignItems: 'stretch'},
  });

export default function HomeScreen() {
  const theme = useTheme();
  const baseStyles = styles(theme);
  return (
    <View style={baseStyles.container}>
      <ScrollView>
        <>
          <Trending style={baseStyles.trending} />
          <Sections style={baseStyles.sections} />
        </>
      </ScrollView>
    </View>
  );
}
