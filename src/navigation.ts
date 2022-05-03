import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Movie: {id: number};
  Person: {id: number};
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;
