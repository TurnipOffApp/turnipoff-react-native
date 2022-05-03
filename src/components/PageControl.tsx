import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import {Theme} from '../themes';
import {useTheme} from './AppContextProvider';

const styles = (theme: Theme | undefined) =>
  StyleSheet.create({
    frame: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme?.colors.background1,
      borderRadius: 12,
      flexDirection: 'row',
      padding: 4,
      alignSelf: 'center',
    },
    dot: {
      backgroundColor: theme?.colors.text,
      width: 8,
      height: 8,
      margin: 4,
      borderRadius: 20,
    },
  });

export interface PageControlProps {
  style?: ViewStyle;
  selectedPage: number;
  pageCount: number;
  onPress?: (page: number) => void;
}

export default function PageControl({
  style,
  pageCount,
  selectedPage,
  onPress,
}: PageControlProps) {
  const theme = useTheme();
  const baseStyles = styles(theme);

  return (
    <View style={style}>
      <View style={baseStyles.frame}>
        {Array.from(Array(pageCount).keys()).map(p => (
          <Pressable
            key={p}
            onPress={() => {
              if (onPress) {
                onPress(p);
              }
            }}>
            <View
              style={{
                ...baseStyles.dot,
                ...{opacity: p === selectedPage ? 1 : 0.3},
              }}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
