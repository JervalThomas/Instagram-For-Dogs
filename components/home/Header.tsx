import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import { FIREBASE_AUTH } from '../../firebaseConfig'

const Header = ({ navigation } : any) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image
                    source={require('../../assets/insta-written.png')}
                    style={styles.logo} />
            </TouchableOpacity>
            <View style={styles.iconContainers}>
                <TouchableOpacity>
                    <Image
                        source={require('../../assets/heart.png')}
                        style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgesText}>11</Text>
                    </View>
                    <Image
                        source={require('../../assets/messenger.png')}
                        style={styles.icon} />
                </TouchableOpacity>
            </View>

            <Button 
                title = "Sign out" 
                onPress = {() => FIREBASE_AUTH.signOut()}
            />
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain',
    },
    iconContainers: {
        flexDirection: 'row'
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        resizeMode: 'contain'
    },
    unreadBadge: {
        backgroundColor: '#FF3250',
        position: 'absolute',
        left: 20,
        bottom: 18,
        width: 25, 
        height: 18,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    }, 
    unreadBadgesText: {
        color: 'white',
        fontWeight: '600'
    }
})