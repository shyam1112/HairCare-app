import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddData from './AddData';
import RequestAccept from './RequestAccept';
import Profile from './Profile';


export default function Shophome() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={RequestAccept} />
      <Tab.Screen name="Add Shop" component={AddData} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

