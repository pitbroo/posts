'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import PostComponent from "@/app/post/PostComponent";
import { posts } from "@/app/post/PostData";
import LoginComponent from "@/app/login/LoginComponent";

const PostsPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <div>
            <h1>Poster</h1>
            {!isLoggedIn ? (
                <LoginComponent onLogin={handleLogin} />
            ) : (
                <PostComponent posts={posts} />
            )}
        </div>
    );
};

export default PostsPage;
