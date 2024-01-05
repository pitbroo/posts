'use client';

import React, {useState} from 'react';
import PostComponent from "@/app/post/PostComponent";
import LoginComponent from "@/app/login/LoginComponent";
import UserInformation from "@/app/login/UserInformation";

const PostsPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);


    // @ts-ignore
    const handleLogin = (userData) => {
        setIsLoggedIn(true);
        setUserData(userData)
    };
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserData(null);
        window.location.reload();
    };

    return (
        <div>
            <div
                className="fixed top-0 left-0 p-2 flex items-center bg-white rounded-l">
                <h1 className="text-3xl ">
                    Poster
                </h1>
                <img
                    src="https://thumbs.dreamstime.com/b/comments-line-icon-speech-bubbles-outline-logo-illustrat-illustration-linear-pictogram-isolated-white-90234461.jpg"
                    alt="Logo" className="w-14 h-14"/>
            </div>

            {isLoggedIn && <UserInformation userData={userData} onLogout={handleLogout}/>}

            {!isLoggedIn ? (
                <LoginComponent onLogin={handleLogin}/>
            ) : (
                <PostComponent userData={userData}/>
            )}
        </div>
    );
};

export default PostsPage;
