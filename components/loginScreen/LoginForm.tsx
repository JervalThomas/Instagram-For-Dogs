import { View, TextInput, StyleSheet, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'




const LoginForm = ({navigation}) => 
{
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
        <View style = {styles.wrapper}>
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

            <View style = {{ alignItems: 'flex-end', marginBottom: 30 }}>
                <Text style = {{color: '#6BB0F5'}}> Forgot password?</Text>
            </View>

            <Pressable 
                style = { styles.button } 
                onPress = {onSignIn}
            >
                <Text style = {styles.buttonText}> Log In</Text> 
            </Pressable>

            <View 
                style = {styles.signupContainer} 
            >
                <Text> Don't have an account? </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")} 
                >    
                    <Text style = {{color: '#6BB0F5'}}>Sign Up</Text>
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


export default LoginForm


  