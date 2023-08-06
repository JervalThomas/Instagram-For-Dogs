import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { User } from 'firebase/auth'
import { USERS } from '../../data/users'

const Stories = () => {
    return (
        <View style={{ marginBottom: 13}}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}>
                    {USERS.map((story, index) => (
                        <Image source={{uri: story.image}} style={styles.story}/>
                    ))}
            </ScrollView>
            <Text style={{ color: 'white'}}>STORIES</Text>
        </View>
    )
}

export default Stories

const styles = StyleSheet.create({
    story: {
        width: 80,
        height: 80,
    }
})