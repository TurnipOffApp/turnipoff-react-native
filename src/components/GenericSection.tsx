import React from 'react';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
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
      ...theme?.typos.normal,
      fontWeight: 'bold',
    },
    posterContainer: {
      paddingHorizontal: 4,
      paddingVertical: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemName: {
      color: theme?.colors.text,
      textAlign: 'center',
      ...theme?.typos.small,
      marginTop: 4,
      maxWidth: 110,
    },
    itemRole: {
      color: theme?.colors.text,
      textAlign: 'center',
      ...theme?.typos.tiny,
      marginTop: 4,
      maxWidth: 105,
    },
  });

export interface GenericSectionItem {
  id: number;
  imagePath: string;
  title: string;
  subTitle: string;
}

export interface GenericSectionProps {
  items: GenericSectionItem[];
  onPress?: (item: GenericSectionItem) => void;
  title: string;
}

export default function GenericSection({
  items,
  onPress,
  title,
}: GenericSectionProps) {
  const dimensions = useWindowDimensions();
  const theme = useTheme();
  const baseStyles = styles(theme);

  const renderItem: ListRenderItem<GenericSectionItem> = ({index, item}) => {
    return (
      <Pressable
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
          imagePath={item.imagePath}
          height={dimensions.height / 5}
          format="w185"
          onPress={() => {
            if (onPress) {
              onPress(item);
            }
          }}
        />
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={baseStyles.itemName}>
          {item.title}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={baseStyles.itemRole}>
          {item.subTitle}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={baseStyles.container}>
      {title && <Text style={baseStyles.title}>{title}</Text>}
      <FlatList
        horizontal={true}
        data={items}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={true}
        onEndReachedThreshold={0.2}
        renderItem={renderItem}
      />
    </View>
  );
}
