'use client';

import React, { useState } from 'react';
import PostComponent from "@/app/post/PostComponent";
import LoginComponent from "@/app/login/LoginComponent";

const PostsPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null); //

    const handleLogin = (newToken: string) => {
        setIsLoggedIn(true);
        // @ts-ignore
        setToken(newToken);
    };

    return (
        <div>
            <h1 style={{
                fontSize: '36px',
                color: '#333',
                textAlign: 'center',
                margin: '20px 0',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
            }}>
                Poster
            </h1>

            {!isLoggedIn ? (
                <LoginComponent onLogin={handleLogin} />
            ) : (
                <PostComponent token={token} />
            )}
        </div>
    );
};

export default PostsPage;
