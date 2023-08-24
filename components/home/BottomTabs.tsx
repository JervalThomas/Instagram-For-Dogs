import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Divider } from "react-native-elements"
import { USERS } from '../../data/users'

export const bottomTabIcons = [
    {
        name: "Home",
        active: require("../../assets/home_selected.png"),
        inactive: require("../../assets/home.png"),
    },
    {
        name: "Explore",
        active: require("../../assets/search_selected.png"),
        inactive: require("../../assets/search.png"),
    },
    {
        name: "Create",
        active: require("../../assets/add_selected.png"),
        inactive: require("../../assets/create.png"),
    },
    {
        name: "Reels",
        active: require("../../assets/reels.png"),
        inactive: require("../../assets/reels.png"),
        
    },
    {
        name: "Profile",
        active: USERS[0].image,
        inactive: USERS[0].image,
        
    },
]

const BottomTabs = ({ icons, navigation }) => 
{
    const [activeTab, setActiveTab] = useState('Home')

    const Icon = ({ icon }) => 
    (
        <TouchableOpacity onPress={() => 
        {
            setActiveTab(icon.name);
            if (icon.name === "Create")
            {
                navigation.push('NewPostScreen');
            }
            else if(icon.name === "Home")
            {
                navigation.push('HomeScreen');
            }
        }}
        >
            <Image 
                source = 
                {
                    activeTab == icon.name ? icon.active : icon.inactive
                } 
                style = 
                {
                    [
                        styles.icon, icon.name === "Profile" ? styles.profilePicture : null
                    ]
                } 
            />
        </TouchableOpacity>
    )

    return (
        <View style={styles.wrapper}>
            <Divider width={1} orientation='vertical'/>
            <View style={styles.container}>
                {icons.map((icon, index) => (
                    <Icon key={index} icon={icon} />
                ))}
            </View>
        </View>
    )
}

export default BottomTabs

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute', 
        width: '100%', bottom:'3%',
        zIndex: 999, 
        backgroundColor: '#000',
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        height: 50,
        paddingTop: 10,

    },
    icon: {
        width: 30,
        height: 30,
    },
    profilePicture: {
        borderRadius: 50,
        borderWidth: 0,
        borderColor: '#fff',
    },
})
