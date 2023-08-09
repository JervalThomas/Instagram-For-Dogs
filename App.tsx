import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged, User } from 'firebase/auth';

import { FIREBASE_AUTH } from './firebaseConfig';
import LandingScreen from "./screens/landing";
import RegisterScreen from "./screens/register";
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';

const MainStack = createNativeStackNavigator();
const NoUserStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();

function UserLayout() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name = "Home" component = {HomeScreen} options = {{ headerShown: false }} />
    </UserStack.Navigator>
  );
}

function NoUserLayout() {
  return (
    <NoUserStack.Navigator>
      {/* <NoUserStack.Screen name = "Landing" component = {LandingScreen} options = {{ headerShown: false }} /> */}
      <NoUserStack.Screen 
        name = "Login" 
        options = {{ headerShown: false }}
       > 
        {({ navigation }) => <LoginScreen navigation={navigation} />}
      </NoUserStack.Screen>
      <NoUserStack.Screen name = "Register" component = {RegisterScreen} />
      <NoUserStack.Screen name = "Home" component = {HomeScreen} options = {{ headerShown: false }} />
    </NoUserStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []);

  return (
    <GestureHandlerRootView style = {{ flex: 1 }}>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName = "Landing">
          {user ? (
            <MainStack.Screen name = "UserLoggedIn" component = {UserLayout} options = {{ headerShown: false }} />
          ) : (
            <MainStack.Screen name = "NoUser" component = {NoUserLayout} options = {{ headerShown: false }} />
          )}
        </MainStack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
