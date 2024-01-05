import React, {useEffect, useState} from 'react';
import AddPost from "@/app/post/AddPost";

interface Author {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
}

interface Comment {
    id: number;
    text: string;
    author: Author;
}

interface Post {
    id: number;
    name: string;
    description: string;
    photo: string;
    comments: Comment[];
    author: Author;
}

interface UserData {
    id: number
    token: string;
    firstName: string;
    lastName: string;
    username: string;
}

interface PostComponentProps {
    userData: UserData;
}

const PostComponent: React.FC<PostComponentProps> = ({userData}) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const fetchPosts = async () => {
        try {
            const response = await fetch('https://localhost:7102/post', {
                headers: {
                    'Authorization': `Bearer ${userData.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    useEffect(() => {


        fetchPosts();
    }, [userData.token]);
    const handleAddPostSuccess = (newPost: Post) => {
        fetchPosts();
        // setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    const getRandomPhotoUrl = () => {
        const uniqueString = Math.random().toString(36).substr(2, 9);
        return `https://source.unsplash.com/random/600x400?sig=${uniqueString}`;
    };

    function generateRandomDate() {
        const start = new Date(2024, 0, 1).getTime();
        const end = new Date().getTime();
        const randomTime = start + Math.random() * (end - start);
        return new Date(randomTime).toLocaleDateString();
    }

    const getRandomAvatarUrl = () => {
        return `https://robohash.org/${Math.random().toString(36).substring(7)}`;
    };

    return (
        <div className="container mx-auto p-6">
            <AddPost userData={userData} onAddPostSuccess={handleAddPostSuccess}/>
            {posts.map((post) => (
                <div key={post.id} className="mb-8 p-6 bg-white rounded-lg shadow-md">
                    <div className="flex justify-between">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">{post.name}</h2>
                    </div>
                    <p className="text-gray-600 text-base leading-relaxed">{post.description}</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img src={getRandomAvatarUrl()} alt="Author's Avatar"
                                 className="w-8 h-8 rounded-full mr-2 border border-gray-300"/>
                            <p className="text-sm text-gray-500">Posted
                                by: {post.author.firstName} {post.author.lastName}</p>
                        </div>
                        <p className="text-gray-500">{generateRandomDate()}</p>
                    </div>
                    <img src={getRandomPhotoUrl()} alt="Random"
                         className="mt-4 mb-4 max-w-full h-auto rounded-md border border-gray-300"/>
                    {post.comments.length > 0 && (
                        <>
                            <h3 className="text-xl font-semibold mt-6 mb-2">Comments:</h3>
                            <ul className="list-disc pl-5">
                                {post.comments.map((comment) => (
                                    <li key={comment.id} className="mb-2 text-gray-700 flex">
                                        <img src={getRandomAvatarUrl()} alt="Commenter's Avatar"
                                             className="w-6 h-6 rounded-full mr-2 border border-gray-300"/>
                                        <div>
                                            {comment.text}
                                            <p className="text-sm text-gray-500">Comment
                                                by: {comment.author.firstName} {comment.author.lastName}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            ))}
        </div>
    );

};

export default PostComponent;
