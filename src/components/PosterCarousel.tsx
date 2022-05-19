import React, {useLayoutEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  ListRenderItem,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {Movie} from '../models/Movie';
import Poster from './Poster';
import PageControl from './PageControl';

const styles = () =>
  StyleSheet.create({
    list: {
      overflow: 'visible',
      marginTop: 16,
    },
    pageControl: {
      marginVertical: 16,
    },
    posterContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export interface PosterCarouselProps {
  movies: Movie[];
  onPress?: (movie: Movie) => void;
}

export default function PosterCarousel({movies, onPress}: PosterCarouselProps) {
  const dimensions = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);
  const [selectedPage, setSelectedPage] = useState(0);
  const baseStyles = styles();

  useLayoutEffect(() => {
    scrollToPage(selectedPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dimensions]);

  const renderItem: ListRenderItem<Movie> = ({item}) => {
    return (
      <View
        style={{...baseStyles.posterContainer, ...{width: dimensions.width}}}>
        <Poster
          imagePath={item.poster_path}
          height={dimensions.height / 3}
          format="w185"
          onPress={() => {
            if (onPress) {
              onPress(item);
            }
          }}
        />
      </View>
    );
  };

  const scrollToPage = (page: number) => {
    if (flatListRef.current) {
      let offset = selectedPage * dimensions.width;
      if (page < selectedPage) {
        offset = selectedPage * dimensions.width + dimensions.width * -1;
      } else if (page > selectedPage) {
        offset = selectedPage * dimensions.width + dimensions.width;
      }
      flatListRef.current.scrollToOffset({
        offset,
      });
    }
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        style={baseStyles.list}
        horizontal={true}
        data={movies}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        bounces={movies?.length > 1}
        snapToAlignment={'start'}
        snapToInterval={dimensions.width}
        decelerationRate={'fast'}
        keyExtractor={item => item.id.toString()}
        onScroll={event => {
          const activePage =
            event.nativeEvent.contentOffset.x / dimensions.width;
          setSelectedPage(Math.round(activePage));
        }}
      />
      <PageControl
        style={baseStyles.pageControl}
        selectedPage={selectedPage}
        pageCount={movies.length}
        onPress={page => {
          scrollToPage(page);
        }}
      />
    </View>
  );
}
