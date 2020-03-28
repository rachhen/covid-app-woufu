import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Details from '../screens/Details';
import Total from '../screens/Total';
import {Icon} from '@ui-kitten/components';
import {CountryCovid} from 'models/country-covid.model';

export type RootStackParamList = {
  Home: undefined;
  Details: {countryCovid: CountryCovid};
};

const Stack = createStackNavigator<RootStackParamList>();
const BottomTabs = createBottomTabNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{title: 'Countries Infected'}}
    />
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
);

const BottomTabNavigator = () => (
  <BottomTabs.Navigator>
    <BottomTabs.Screen
      name="Total"
      component={Total}
      options={{
        tabBarLabel: 'Total Cases',
        tabBarIcon: ({color, size}) => (
          <Icon name="bulb-outline" width={size} height={size} fill={color} />
        ),
      }}
    />
    <BottomTabs.Screen
      name="Country"
      component={StackNavigator}
      options={{
        tabBarLabel: 'Countries',
        tabBarIcon: ({color, size}) => (
          <Icon name="flag-outline" width={size} height={size} fill={color} />
        ),
      }}
    />
  </BottomTabs.Navigator>
);

export const Navigator = () => (
  <NavigationContainer>
    <BottomTabNavigator />
  </NavigationContainer>
);
