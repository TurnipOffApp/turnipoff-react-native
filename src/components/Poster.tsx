import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {TMDB_IMAGE_BASE_URL} from '../config';

const RATIO = 2 / 3;

const styles = (height: number, width: number) =>
  StyleSheet.create({
    container: {},
    image: {borderRadius: 10},
    imageContainer: {
      height,
      width,
      borderRadius: 10,
    },
    placeholder: {
      position: 'absolute',
      height,
      width,
      borderRadius: 10,
    },
  });

export interface PosterProps {
  imagePath: string;
  format: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
  height: number;
  onPress?: () => void;
}

export default function Poster({
  imagePath,
  format,
  height,
  onPress,
}: PosterProps) {
  const url = `${TMDB_IMAGE_BASE_URL}/${format}${imagePath}`;
  const baseStyles = styles(height, height * RATIO);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <View>
      <Pressable
        style={({pressed}) => [{opacity: pressed && onPress ? 0.5 : 1.0}]}
        onPress={() => {
          if (onPress) {
            onPress();
          }
        }}>
        <View style={baseStyles.imageContainer}>
          {(!loaded || error) && (
            <Image
              style={baseStyles.placeholder}
              source={require('../../assets/missing_picture.jpeg')}
            />
          )}
          <Image
            onLoadEnd={() => {
              setLoaded(true);
            }}
            onError={() => {
              setError(true);
            }}
            style={baseStyles.image}
            source={{
              uri: url,
              height,
              width: height * RATIO,
            }}
          />
        </View>
      </Pressable>
    </View>
  );
}
