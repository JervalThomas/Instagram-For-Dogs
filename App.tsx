import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { IdTokenResult, onAuthStateChanged, User } from 'firebase/auth';

import { FIREBASE_AUTH } from './firebaseConfig';
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

export default function App() 
{
  const [user, setUser] = useState < User | null > (null);
  const bypassAuthentication = true;

  useEffect(() => {
    if (bypassAuthentication) {
      const mockUser: User = {
        uid: 'mockUserId',
        displayName: 'Test User',
        email: 'test@example.com',
        emailVerified: false,
        isAnonymous: false,
        metadata: undefined,
        providerData: [],
        refreshToken: '',
        tenantId: '',
        delete: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
        getIdToken: function (forceRefresh?: boolean): Promise<string> {
          throw new Error('Function not implemented.');
        },
        getIdTokenResult: function (forceRefresh?: boolean): Promise<IdTokenResult> {
          throw new Error('Function not implemented.');
        },
        reload: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
        toJSON: function (): object {
          throw new Error('Function not implemented.');
        },
        phoneNumber: '',
        photoURL: '',
        providerId: ''
      };
      setUser(mockUser);
    } else {
      onAuthStateChanged(FIREBASE_AUTH, (user) => {
        console.log('user', user);
        setUser(user);
      });
    }
  }, []);

  // useEffect(() => 
  // {
  //   onAuthStateChanged
  //   (FIREBASE_AUTH, (user) => 
  //     {
  //       console.log('user', user);
  //       setUser(user);
  //     }
  //   );
  // },[]);

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
