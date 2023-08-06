import { View, Text, TextInput, Button } from 'react-native'
import React, { useState} from 'react'
import { FIREBASE_APP, FIREBASE_AUTH } from '../../firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const Register = () => 
{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = FIREBASE_AUTH;

    const onSignUp = async () =>
    {
        try
        {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            
        }
        catch(error: any)
        {
            console.log(error);
            alert('Registration failed: ' + error.message);
        }
    }

    return (
      <View>
        <TextInput
          placeholder = "Name"
          autoCapitalize = "none"
          onChangeText = {(name) => setName(name)}
          >
        </TextInput>

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
            title = "Sign UP" 
            onPress = {onSignUp}
        />
      </View>
)}

export default Register