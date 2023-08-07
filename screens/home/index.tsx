import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/home/Header'
import Stories from '../../components/home/Stories'
import Post from '../../components/home/Post'
import { ScrollView } from 'react-native-gesture-handler'
import { POSTS } from '../../data/posts'

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header />
        <Stories />
        <ScrollView>
          {POSTS.map((post, index) => (
            <Post post={post} key={index}/>
          ))}
        </ScrollView>
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