import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'


const PostFooterIcons = [
    {
        name: "Like",
        Image: require("../../assets/heart.png"),
        likedImage: "",
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
    return (
        <View style={{ marginBottom: 30 }}>
            <Divider width={1} orientation='vertical' />
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={{ marginTop: 10 }}>
                <PostFooter />
                <Likes post={post} />
                <Caption post={post} />
                <CommentsSection post={post} />
                <Comments post={post}/>
            </View>
        </View>
    )
}
const PostHeader = ({ post }) => (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        alignItems: 'center',
    }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={post.profilePicture} style={styles.story} />
            <Text style={{ color: "white", marginLeft: 5, fontWeight: "700" }}>{post.user}</Text>
        </View>
        <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
    </View>
)

const PostImage = ({ post }) => (
    <View style={{ width: "100%", height: 450 }}>
        <Image source={post.postImage} style={{ height: "100%", resizeMode: "cover" }} />
    </View>

)

const PostFooter = () => (
    <View style={{ flexDirection: "row" }}>
        <View style={styles.LeftFooterIconsContainer}>
            <Icon imgStyle={styles.footerIcon} imgUrl={PostFooterIcons[0].Image} />
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
        <Text style={{ color: "white" }}> {post.likes.toLocaleString('en')} likes </Text>
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