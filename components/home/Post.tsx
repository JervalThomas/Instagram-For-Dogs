import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, {useState,useEffect} from 'react'
import { Divider } from 'react-native-elements'
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from '../../firebaseConfig'
import { arrayRemove, arrayUnion, doc, updateDoc,  } from 'firebase/firestore';

const auth = FIREBASE_AUTH;
const db = FIREBASE_FIRESTORE

const PostFooterIcons = [
    {
        name: "Like",
        Image: require("../../assets/heart.png"),
        likedImage: require("../../assets/redheart.png"),
    },
    {
        name: "Comments",
        Image: require("../../assets/message-circle.png"),
        likeedImage: "",
    },
    {
        name: "Share",
        Image: require("../../assets/direct_message.png"),
        likeedImage: "",
    },
    {
        name: "Save",
        Image: require("../../assets/bookmark.png"),
        likeedImage: "",
    },
]

const Post = ({ post }) => {

    const handlelike = post =>
    {
        const currentLikeStatus = !post.likes_by_users.includes
        (
            auth.currentUser.email
        )

        const userDocRef = doc(db, 'users', post.owner_email, 'posts', post.id)
        
        updateDoc(userDocRef,
            {
                likes_by_users: currentLikeStatus 
                ? arrayUnion(auth.currentUser.email)
                : arrayRemove(auth.currentUser.email),
            }
        ).then(() => {
            console.log('Document successfully updated!')
        })
        .catch(error => {
            console.error('Error updaating document: ', error)
        })

        const updatedPost = { ...post };
        if (currentLikeStatus) 
        {
            updatedPost.likes_by_users.push(auth.currentUser.email);
        } 
        else 
        {
            const index = updatedPost.likes_by_users.indexOf(auth.currentUser.email);
            if (index !== -1) 
            {
                updatedPost.likes_by_users.splice(index, 1);
            }
        }
        
    }
    
    return (
        <View style={{ marginBottom: 30 }}>
            <Divider width={1} orientation='vertical' />
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={{ marginTop: 10 }}>
                <PostFooter post = {post} handlelike = {handlelike} />
                <Likes post={post} />
                <Caption post={post} />
                <CommentsSection post={post} />
                <Comments post={post}/>
            </View>
        </View>
    );
}
const PostHeader = ({ post }) => (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        alignItems: 'center',
    }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{uri: post.profilePicture}} style={styles.story} />
            <Text style={{ color: "white", marginLeft: 5, fontWeight: "700" }}>{post.user}</Text>
        </View>
        <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
    </View>
)

const PostImage = ({ post }) => (
    <View style={{ width: "100%", height: 450 }}>
        <Image source={{uri: post.imageUrl}} style={{ height: "100%", resizeMode: "cover" }} />
    </View>

)

const PostFooter = ({handlelike, post}) => (
    <View style={{ flexDirection: "row" }}>
        <View style={styles.LeftFooterIconsContainer}>
            <TouchableOpacity onPress = {() => handlelike(post)}>  
                <Image 
                    style = { styles.footerIcon } 
                    source = 
                    { 
                        post.likes_by_users.includes(auth.currentUser.email) 
                        ? PostFooterIcons[0].likedImage
                        : PostFooterIcons[0].Image 
                    } 
                />
            </TouchableOpacity>
            
            <Icon imgStyle={styles.footerIcon} imgUrl={PostFooterIcons[1].Image} />
            <Icon imgStyle={styles.footerIcon} imgUrl={PostFooterIcons[2].Image} />
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Icon imgStyle={styles.footerIcon} imgUrl={PostFooterIcons[3].Image} />
        </View>
    </View>

)

const Likes = ({ post }) => (
    <View style={{ flexDirection: "row", marginTop: 4 }}>
        <Text style={{ color: "white" }}> {post.likes_by_users.length.toLocaleString('en')} likes </Text>
    </View>
)
const Caption = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        <Text style={{ color: 'white' }}>
            <Text style={{ fontWeight: "600" }}>{post.user}</Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
)

const CommentsSection = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        {!!post.comments.length && (
            <Text style={{ color: 'gray' }}>
                View{post.comments.length > 1 ? " all" : " "} {post.comments.length}{''}
                {post.comments.length > 1 ? " comments" : " comment"}
            </Text>
        )}
    </View>
)

const Comments = ({ post }) => (
    <>
    {post.comments.map((comment, index) => 
    <View style={{flexDirection: "row", marginTop: 4}} key={index}>
        <Text style={{color: "white"}}>
            <Text style={{fontWeight: "600"}}>{comment.user}</Text>{" "}
            {comment.comment}
        </Text>
    </View>
    )}
    </>
)

const Icon = ({ imgStyle, imgUrl }) => (
    <TouchableOpacity>
        <Image source={imgUrl} style={imgStyle} />
    </TouchableOpacity>
)

export default Post

const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        borderColor: '#ff6501',
        marginLeft: 6,
        borderWidth: 1.6,
    },
    footerIcon: {
        height: 33,
        width: 33,
    },
    LeftFooterIconsContainer: {
        flexDirection: 'row',
        width: '32%',
        justifyContent: 'space-between',
    },
})