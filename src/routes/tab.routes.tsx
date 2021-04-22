import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MyPlants } from '../pages/MyPlants';
import { PlantSelect } from '../pages/PlantSelect';

import colors from '../styles/colors';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
  return (
    <AppTab.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon',
        style: {
          paddingVertical: 20,
          height: 88,
        },
      }}
    >
      <AppTab.Screen
        name="New Plant"
        component={PlantSelect}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <AppTab.Screen
        name="My Plants"
        component={MyPlants}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name="format-list-bulleted" size={size} color={color} />
          ),
        }}
      />
    </AppTab.Navigator>
  );
};

export default AuthRoutes;
