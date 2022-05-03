import {TextStyle} from 'react-native';

export interface ThemeColors {
  background0: string;
  background1: string;
  background2: string;
  text: string;
}

export interface ThemeTypos {
  title: TextStyle;
  small: TextStyle;
  normal: TextStyle;
  tiny: TextStyle;
}

export interface Theme {
  statusBar: 'light-content' | 'dark-content';
  colors: ThemeColors;
  typos: ThemeTypos;
}

export const lightTheme: Theme = {
  statusBar: 'dark-content',
  colors: {
    background0: 'white',
    background1: 'rgb(235, 235, 235)',
    background2: 'rgb(184, 184, 184)',
    text: 'black',
  },
  typos: {
    title: {fontSize: 22},
    small: {fontSize: 15},
    tiny: {fontSize: 12},
    normal: {fontSize: 17},
  },
};

export const darkTheme: Theme = {
  ...lightTheme,
  statusBar: 'light-content',
  colors: {
    ...lightTheme.colors,
    background0: 'black',
    background1: 'rgb(35, 35, 35)',
    text: 'white',
  },
};
