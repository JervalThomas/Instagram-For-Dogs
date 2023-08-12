import { USERS } from './users'

export const POSTS = [
    {
        postImage: require('../assets/train/dog.263.jpg'),
        user: USERS[0].user,
        likes: '1209',
        profilePicture: USERS[0].image,
        caption: " Me and my lovely dog Maddy. she been with me since i moved in and she loves her new home",
        comments: [
            {
                user: 'Mitchel',
                comment: 'Love your dog, she a beauty 🥺',
            },
            {
                user: 'Mandy',
                comment: "She's so cute 🫣",
            },
        ],
    },
]