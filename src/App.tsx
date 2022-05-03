/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {AppContextProvider, useTheme} from './components';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './screens/Home';
import {MovieScreen} from './screens/Movie';
import {PersonScreen} from './screens/Person';

const AppContainer = () => {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  const theme = useTheme();

  const headerOptions = {
    headerStyle: {
      backgroundColor: theme?.colors.background0,
    },
    headerTintColor: theme?.colors.text,
  };

  return (
    <>
      <StatusBar barStyle={theme?.statusBar} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            contentStyle: {backgroundColor: theme?.colors.background0},
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{...headerOptions, title: 'TurnipOff RN'}}
          />
          <Stack.Screen
            name="Movie"
            component={MovieScreen}
            options={{...headerOptions, title: 'Movie details'}}
          />
          <Stack.Screen
            name="Person"
            component={PersonScreen}
            options={{...headerOptions, title: 'Person details'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppContainer;
