import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/home/Header'
import Stories from '../../components/home/Stories'

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
    <View>
      <Header/>
      <Stories/>
    </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  }
})