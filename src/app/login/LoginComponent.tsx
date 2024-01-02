'use client';
import React, { useState } from 'react';
import axios from 'axios';

// @ts-ignore
const LoginComponent = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // @ts-ignore
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7102/Users/authenticate', {
                username,
                password
            });
            onLogin(response.data.token);
        } catch (error) {
            // @ts-ignore
            if (error.response && error.response.status === 400) {
                setError('Błędny login lub hasło');
            } else {
                console.error('Login error:', error);
            }
        }
    };

    return (
        <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-10">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Zaloguj
            </button>
        </form>
    );
}

export default LoginComponent;
