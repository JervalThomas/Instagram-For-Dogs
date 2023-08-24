import { View, Text, Image, TextInput, Button, } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import { FIREBASE_FIRESTORE, FIREBASE_AUTH } from '../../firebaseConfig'
import { addDoc, collection, doc, getDocs, query, where, } from 'firebase/firestore'

const db = FIREBASE_FIRESTORE;
const auth = FIREBASE_AUTH;

const PLACEHOLDER_IMG = 'https://www.wolflair.com/wp-content/uploads/2017/01/placeholder.jpg'

const uploadPostSchema = Yup.object().shape
(
    {
        imageUrl: Yup.string().url().required('A URL is required'),
        caption: Yup.string().max(2200, 'Caption has reached the character limit')
    }
)

const FormikPostUploader = ({navigation}) => 
{
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

    const getUsername = async () => 
    {
        const user = auth.currentUser;
        const userCollection = collection(db, 'users');
        const q = query(userCollection, where('owner_uid', '==', user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) 
        {
            const userData = querySnapshot.docs[0].data();
            setCurrentLoggedInUser(
            {
              username: userData.username,
              profilePicture: userData.profile_picture,
            });
        }
        
    };

    useEffect(() => 
    {
        getUsername();
    }, []);

    const uploadPostToFirebase = (imageUrl, caption) =>
    {
        const userDocRef = doc(db, 'users', auth.currentUser.email)

        const unsubscribe = addDoc(collection(userDocRef, 'posts'), 
        {
            imageUrl: imageUrl,
            user: currentLoggedInUser.username,
            profilePicture: currentLoggedInUser.profilePicture,
            owner_uid: auth.currentUser.uid,
            owner_email: auth.currentUser.email,
            caption: caption,
            createdAt: new Date(),
            likes_by_users: [],
            comments: [],
        })
        .then(() => navigation.goBack())

        return unsubscribe
    }

    return (
        <Formik
            initialValues = {{caption: '', imageUrl: ''}}
            onSubmit = 
            {
                values =>
                {
                    uploadPostToFirebase(values.imageUrl, values.caption)
                }   
            }
            validationSchema = {uploadPostSchema}
            validateOnMount = {true}
        >
            {
                (
                    {
                        handleBlur, handleChange, handleSubmit, values, errors, isValid
                    }
                ) => 
                <>
                    <View 
                        style = 
                        {
                            {
                                margin: 20, 
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                            }
                        }
                    >
                        <Image 
                            source={{uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG}} 
                            style = {{ width: 100, height: 100 }}
                        />

                        <View style = {{flex: 1, marginLeft: 12,}}>
                            <TextInput
                                style = {{color: 'white', fontSize: 20 }}
                                placeholder = 'Write a caption...'
                                placeholderTextColor = 'gray'
                                multiline = {true}
                                onChangeText = {handleChange('caption')}
                                onBlur = {handleBlur('caption')}
                                value = {values.caption}
                        />
                        </View>
                    </View>

                    <Divider width={0.2} orientation = 'vertical' />

                    <TextInput
                        style = {{color: 'white', fontSize: 18 }}
                        placeholder = 'Enter Image Url'
                        placeholderTextColor = 'gray'
                        onChangeText={handleChange('imageUrl')}
                        onBlur = {handleBlur('imageUrl')}
                        value = {values.imageUrl}
                        onChange = {(e) => setThumbnailUrl(e.nativeEvent.text)}
                    />

                    {errors.imageUrl && 
                    (
                        <Text
                            style = {{fontSize: 10, color: 'red'}}
                        >
                            {errors.imageUrl}

                        </Text>
                    )
                    }

                    
                    <Button
                        title = 'Share'
                        onPress = {handleSubmit}
                        disabled = {!isValid}
                    />
                </>
            }

        </Formik>
    )
}

export default FormikPostUploader