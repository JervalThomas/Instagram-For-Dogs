import { View, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'

const signIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = FIREBASE_AUTH;

  const onSignIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);

    }
    catch (error: any) {
      console.log(error);
      alert('Login failed: ' + error.message);
    }
  }

  return (
    <View>
      <TextInput
        placeholder = "Email"
        autoCapitalize = "none"
        onChangeText = {(email) => setEmail(email)}
      >
      </TextInput>

      <TextInput
        placeholder = "Password"
        autoCapitalize = "none"
        secureTextEntry = {true}
        onChangeText = {(password) => setPassword(password)}
      >
      </TextInput>

      <Button
        title = "Sign In"
        onPress = {onSignIn}
      />
    </View>
  )
}

export default signIn