import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { createUserWithEmailAndPassword} from 'firebase/auth'

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = FIREBASE_AUTH;

  const onSignUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);

    }
    catch (error: any) {
      console.log(error);
      alert('Registration failed: ' + error.message);
    }
  }

  return (
    <View style = { styles.wrapper } >
        <View style = { styles.inputField } >
            <TextInput
                placeholder = "Name"
                placeholderTextColor = '#444'
                autoCapitalize = "none"
                onChangeText = {(name) => setName(name)}
                autoFocus = {true}
                autoCorrect = {true}
                >
            </TextInput>
        </View>
      

      <View style = {styles.inputField}>
        <TextInput
            placeholderTextColor = '#444'
            placeholder = "Email"
            autoCapitalize = "none"
            onChangeText = {(email) => setEmail(email)}
            keyboardType = 'email-address'
            autoFocus = {true}
            autoCorrect = {false}
        />
      </View>

      <View style = {styles.inputField}>
        <TextInput
            placeholderTextColor = '#444'
            placeholder = "Password"
            autoCapitalize = "none"
            secureTextEntry = {true}
            autoCorrect = {false}
            textContentType = 'password'
            onChangeText = {(password) => setPassword(password)}
        />
        </View>

        <Pressable 
            style = { styles.button } 
            onPress = {onSignUp}
        >
            <Text style = {styles.buttonText}> Log In</Text> 
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create(
    {
        wrapper:
        {
            marginTop: 80,
        },

        inputField:{
            borderRadius: 4,
            padding: 8,
            backgroundColor: "#FAFAFA",
            marginBottom: 10,
            borderWidth: 1, 
        },

        button: {
            backgroundColor: '#0096F6',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 42,
            borderRadius: 4,
        },

        buttonText: 
        {
            fontWeight: "600",
            color: '#fff',
            fontSize: 20,
        },

        signupContainer:
        {
            justifyContent: 'center',
            flexDirection: 'row',
            width: '100%',
            marginTop: 50,
        },
    }
)

export default SignUpForm