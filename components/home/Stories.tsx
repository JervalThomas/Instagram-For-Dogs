import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { User } from 'firebase/auth'
import { USERS } from '../../data/users'

const Stories = () => {
    return (
        <View style={{ marginBottom: 13 }}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}>
                {USERS.map((story, index) => (
                    <TouchableOpacity style={{alignItems: 'center'}} key={index}>
                        <Image source={story.image} style={styles.story} />
                        <Text style={{ color: 'white' }}>
                            {story.user.length > 11 ? story.user.slice(0,10).toLowerCase() + '...' : story.user.toLowerCase()}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default Stories

const styles = StyleSheet.create({
    story: {
        width: 70,
        height: 70,
        borderRadius: 50,
        borderColor: '#ff6501',
        marginLeft: 6,
        borderWidth: 3,
    }
})