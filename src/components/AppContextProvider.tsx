import React from 'react';
import {ReactNode} from 'react';
import {useColorScheme} from 'react-native';
import {darkTheme, lightTheme, Theme} from '../themes';

interface AppContextInterface {
  theme: Theme;
}

const AppContext = React.createContext<AppContextInterface | undefined>(
  undefined,
);

export type AppContextProviderProps = {
  children: ReactNode;
};

export function AppContextProvider({children}: AppContextProviderProps) {
  const colorScheme = useColorScheme();

  const value: AppContextInterface = {
    theme: colorScheme === 'dark' ? darkTheme : lightTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => React.useContext(AppContext);

export const useTheme = () => {
  return useAppContext()?.theme;
};
