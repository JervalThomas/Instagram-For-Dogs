import { View, Image, StyleSheet } from 'react-native'
import React from 'react'

import SignUpForm from '../../components/signUpScreen/signUpForm';

const INSTAGRAM_LOGO = 'https://img.freepik.com/premium-vector/instagram-social-media-icon-gradient-social-media-logo_197792-4682.jpg?w=2000'

const signIn = ({navigation}) => {
  return(
    <View style = {styles.container}>
      <View style = {styles.logoContainer}>
        <Image 
          source = 
          {
            {
              uri: INSTAGRAM_LOGO, 
              height: 150, 
              width: 150
          }
        } 
        />
      </View>

      < SignUpForm navigation = {navigation} />
      
    </View>
  )
}

const styles = StyleSheet.create
(
  {
    container: 
    {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: 50,
      paddingHorizontal: 12,
    },

    logoContainer:
    {
      alignItems: 'center',
      marginTop: 60,
    },

  }
)

export default signIn


