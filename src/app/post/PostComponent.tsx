import React, { useState, useEffect } from 'react';

interface Comment {
    id: number;
    text: string;
}

interface Post {
    id: number;
    name: string;
    description: string;
    comments: Comment[];
}

const PostComponent: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJuYmYiOjE3MDQzMjEwNDEsImV4cCI6MTcwNDkyNTg0MSwiaWF0IjoxNzA0MzIxMDQxfQ.gPiiDvR9VMDpSJmD0EnAJHPg53Myx8MWbz2CMTqDgl8'; // Umieść swój token Bearer
                const response = await fetch('https://localhost:7102/post', {
                    headers: {
                        'Authorization': `Bearer ${token}`
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

        fetchPosts();
    }, []);

    const getRandomPhotoUrl = () => {
        const uniqueString = Math.random().toString(36).substr(2, 9); // Generuje losowy ciąg znaków
        return `https://source.unsplash.com/random/600x400?sig=${uniqueString}`;
    };



    return (
        <div className="container mx-auto p-6">
            {posts.map((post) => (
                <div key={post.id} className="mb-8 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">{post.name}</h2>
                    <p className="text-gray-600 text-base leading-relaxed">{post.description}</p>
                    <img src={getRandomPhotoUrl()} alt="Random" className="mt-4 mb-4 max-w-full h-auto rounded-md border border-gray-300" />
                    {post.comments.length > 0 && (
                        <>
                            <h3 className="text-xl font-semibold mt-6 mb-2">Comments:</h3>
                            <ul className="list-disc pl-5">
                                {post.comments.map((comment) => (
                                    <li key={comment.id} className="mb-2 text-gray-700">{comment.text}</li>
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