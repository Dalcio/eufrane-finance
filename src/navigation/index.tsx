import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {RootNavigator} from './root';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
