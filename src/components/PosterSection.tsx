import React, {useRef} from 'react';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {Movie} from '../models/Movie';
import {MovieQuery} from '../network';
import {Theme} from '../themes';
import {useTheme} from './AppContextProvider';
import Poster from './Poster';

const styles = (theme: Theme | undefined) =>
  StyleSheet.create({
    container: {
      borderTopColor: theme?.colors.background1,
      borderTopWidth: 1,
      paddingVertical: 8,
    },
    title: {
      color: theme?.colors.text,
      textAlign: 'center',
      ...theme?.typos.title,
    },
    posterContainer: {
      padding: 20,
    },
  });

export interface PosterSectionProps {
  title?: string;
  query: MovieQuery;
  onPress?: (movie: Movie) => void;
}

export default function PosterSection({
  title,
  query,
  onPress,
}: PosterSectionProps) {
  const dimensions = useWindowDimensions();
  const theme = useTheme();
  const baseStyles = styles(theme);
  const flatListRef = useRef<FlatList>(null);

  const {movies, loadMore} = query;

  const renderItem: ListRenderItem<Movie> = ({item, index}) => {
    return (
      <Pressable
        accessible={true}
        accessibilityLabel={`${title}_${index}`}
        testID={`${title}_${index}`}
        style={({pressed}) => [
          baseStyles.posterContainer,
          {opacity: pressed && onPress ? 0.5 : 1.0},
        ]}
        onPress={() => {
          if (onPress) {
            onPress(item);
          }
        }}>
        <Poster
          imagePath={item.poster_path}
          height={dimensions.height / 5}
          format="w154"
          onPress={() => {
            if (onPress) {
              onPress(item);
            }
          }}
        />
      </Pressable>
    );
  };

  return (
    <View style={baseStyles.container}>
      {title && <Text style={baseStyles.title}>{title}</Text>}
      <FlatList
        ref={flatListRef}
        horizontal={true}
        data={movies}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={true}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
        renderItem={renderItem}
      />
    </View>
  );
}
