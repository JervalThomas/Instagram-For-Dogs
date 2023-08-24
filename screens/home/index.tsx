import { StyleSheet, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/home/Header'
import Stories from '../../components/home/Stories'
import Post from '../../components/home/Post'
import { ScrollView } from 'react-native-gesture-handler'
import { POSTS } from '../../data/posts'
import BottomTabs, { bottomTabIcons} from '../../components/home/BottomTabs'
import { FIREBASE_FIRESTORE } from '../../firebaseConfig'
import { collectionGroup, getDocs, onSnapshot } from "firebase/firestore";

const db = FIREBASE_FIRESTORE;

const HomeScreen = ({navigation}) => 
{
  
  const [posts, setPosts] = useState([]);

  useEffect(() => 
  {
    const unsubscribe = onSnapshot(collectionGroup(db, 'posts'), (snapshot) => 
    {
      const fetchedPosts = snapshot.docs.map(post => ({id: post.id, ...post.data()}));
      setPosts(fetchedPosts);
    });
  
    return () => 
    {
      unsubscribe();
    };
  }, []);
  

  // useEffect(() => {
  //   async function fetchData() {
  //     const querySnapshot = await getDocs(collectionGroup(db, 'posts'));

  //     const fetchedPosts = querySnapshot.docs.map((doc) => doc.data());
  //     setPosts(fetchedPosts);

  //     // querySnapshot.docs.forEach((doc) => {
  //     //   const data = doc.data();
  //       // console.log('Caption:', data.caption);
  //       // console.log('Image URL:', data.imageUrl);
  //       // console.log('---');
  //     // });
  //   }

  //   fetchData();
  // }, []);


  return (
    <SafeAreaView style={styles.container}>
        <Header />
        <Stories />
        <ScrollView>
          {posts.map((post, index) => (
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