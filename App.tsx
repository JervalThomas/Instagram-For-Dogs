import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppRegistry } from 'react-native';
import defaultconfig from './metro.config';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from "./screens/landing"
import RegisterScreen from "./screens/register"
import HomeScreen from './screens/home';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name= "Home" component={HomeScreen } options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
