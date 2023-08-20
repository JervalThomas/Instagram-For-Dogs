import { StyleSheet, } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/home/Header'
import Stories from '../../components/home/Stories'
import Post from '../../components/home/Post'
import { ScrollView } from 'react-native-gesture-handler'
import { POSTS } from '../../data/posts'
import BottomTabs, { bottomTabIcons} from '../../components/home/BottomTabs'

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
        <Header />
        <Stories />
        <ScrollView>
          {POSTS.map((post, index) => (
            <Post post={post} key={index}/>
          ))}
        </ScrollView>
      <BottomTabs navigation = {navigation} icons={bottomTabIcons}/>
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