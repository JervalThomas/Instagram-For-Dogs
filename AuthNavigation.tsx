import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IdTokenResult, onAuthStateChanged, User } from 'firebase/auth';

import { FIREBASE_AUTH } from './firebaseConfig';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SignedInStack, SignedOutStack } from './navigation';

const AuthNavigation = () => 
{
    const [user, setUser] = useState < User | null > (null);
    const bypassAuthentication = false;

    useEffect(() => {
        if (bypassAuthentication) 
        {
            const mockUser: User = 
            {
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
        } 
        else{
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (user) {
              console.log('User successfully logged in');
              setUser(user);
            } else {
              console.log('No User');
              setUser(null);
            }
          });
    
          return () => {
            // Unsubscribe the listener when the component unmounts
            unsubscribe();
          };
        }
      }, []);

    return(
        user ? <SignedInStack/> : <SignedOutStack/>
    )
}

export default AuthNavigation