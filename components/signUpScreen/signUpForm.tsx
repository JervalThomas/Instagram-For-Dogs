import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from '../../firebaseConfig'
import { createUserWithEmailAndPassword} from 'firebase/auth'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'



const SignUpForm = ({navigation}) => 
{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_FIRESTORE;
  //const collection = db.collection('users')

  const getRandomProfilePicture = async () => 
  {
    const response = await fetch('https://randomuser.me/api')
    const data = await response.json()
    return data.results[0].picture.large
  }

  const onSignUp = async () => 
  {
    try 
    {
      const authUser = await createUserWithEmailAndPassword(auth, email, password);
      // console.log('User successfully created, \nemail: ', email, '\n password: ', password);

      const docRef = await setDoc(
        doc(collection(db, 'users'), authUser.user.email), 
        {
          owner_uid: authUser.user.uid,
          username: name,
          email: authUser.user.email,
          profile_picture: await getRandomProfilePicture(),
        }
      );

      
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
            <Text style = {styles.buttonText}> Sign Up</Text> 
        </Pressable>

        <View style = {styles.signupContainer}>
          <Text> Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")} >
            <Text style = {{color: '#6BB0F5'}}> Log In</Text>
          </TouchableOpacity>
        </View>
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