import {
  NavigationParams,
  NavigationRoute,
  NavigationScreenProp
} from 'react-navigation';

export type Navigation = NavigationScreenProp<
  NavigationRoute<NavigationParams>,
  NavigationParams
>;

export interface NavigationOptionsProps {
  navigation: Navigation;
}
