import { USERS } from './users'

export const POSTS = [
    {
        postImage: '../assets/train/dog.263.jpg',
        user: USERS[0].user,
        likes: '1209',
        profilePicture: USERS[0].image,
        comments: [
            {
                user: 'Mitchel',
                Comment: 'Love your dog, she a beauty 🥺',
            },
            {
                user: 'Mandy',
                Comment: "She's so cute 🫣",
            },
        ],
    },
]