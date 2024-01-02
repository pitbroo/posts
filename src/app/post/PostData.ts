// data.ts


import {Post} from "@/app/post/Post";
import {Comment} from "@/app/post/Post";

export const posts: Post[] = [
    {
        "userId": 1,
        "id": 101,
        "title": "Sample Post 1",
        "body": "This is the body of the first sample post.",
        "comments": [
            {
                "id": 501,
                "name": "John Doe",
                "email": "john@example.com",
                "body": "Great post! Thanks for sharing."
            },
            {
                "id": 502,
                "name": "Jane Smith",
                "email": "jane@example.com",
                "body": "I found the information very helpful."
            }
        ]
    },
    {
        "userId": 2,
        "id": 102,
        "title": "Sample Post 2",
        "body": "This is the body of the second sample post.",
        "comments": [
            {
                "id": 503,
                "name": "Bob Johnson",
                "email": "bob@example.com",
                "body": "Nice content! Keep it up."
            },
            {
                "id": 504,
                "name": "Alice Brown",
                "email": "alice@example.com",
                "body": "Interesting read."
            }
        ]
    },
    {
        "userId": 3,
        "id": 103,
        "title": "Sample Post 3",
        "body": "This is the body of the third sample post.",
        "comments": [
            {
                "id": 505,
                "name": "Charlie Wilson",
                "email": "charlie@example.com",
                "body": "I have a question about the post."
            },
            {
                "id": 506,
                "name": "Eva Davis",
                "email": "eva@example.com",
                "body": "Thanks for sharing your insights."
            }
        ]
    }
]
