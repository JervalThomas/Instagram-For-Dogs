import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/home';
import NewPostScreen from './screens/newPostScreen';
import RegisterScreen from './screens/register';
import LoginScreen from './screens/login';

const Stack = createStackNavigator();

const screenOptions =
{
    headerShown: false,
};

export const SignedInStack = () => 
(
    <NavigationContainer>
    <Stack.Navigator 
        initialRouteName = 'HomeScreen' 
        screenOptions = {screenOptions}
    >   
        <Stack.Screen name = 'HomeScreen' component = {HomeScreen} />   
        <Stack.Screen name = 'NewPostScreen' component = {NewPostScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)

export const SignedOutStack = () =>
(
    <NavigationContainer>
    <Stack.Navigator 
        initialRouteName = 'LoginScreen' 
        screenOptions = {screenOptions}
    >
        <Stack.Screen name = 'Register' component = {RegisterScreen} />
        <Stack.Screen name = 'LoginScreen' component = {LoginScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)

