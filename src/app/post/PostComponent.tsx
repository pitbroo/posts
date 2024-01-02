import React, { useState, useEffect } from 'react';
import {Post, Comment} from "@/app/post/Post";

interface PostComponentProps {
    posts: Post[];
}

const PostComponent: React.FC<PostComponentProps> = ({ posts}) => {
    return (
        <div className="container mx-auto p-6">
            {posts.map((post) => (
                <div key={post.id} className="mb-8 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">{post.title}</h2>
                    <p className="text-gray-700">{post.body}</p>
                    <h3 className="text-xl font-semibold mt-6 mb-2">Comments:</h3>
                    <ul>
                        {post.comments.map((comment) => (
                            <li key={comment.id} className="mb-2">
                                <strong className="text-blue-500">{comment.name}</strong> ({comment.email}): {comment.body}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default PostComponent