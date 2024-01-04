import React, { useState } from 'react';

interface AddPostProps {
    token: string;
    onAddPostSuccess: (post: any) => void;
}

const AddPost: React.FC<AddPostProps> = ({ token, onAddPostSuccess }) => {
    const [postName, setPostName] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newPost = {
            name: postName,
            description: postDescription,
        };

        try {
            const response = await fetch('https://localhost:7102/Post', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            onAddPostSuccess(responseData);
            setPostName('');
            setPostDescription('');
            setSuccessMessage('Post został dodany pomyślnie.');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Wystąpił błąd podczas dodawania postu:', error);
        }
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="post-name">
                        Nazwa Postu
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="post-name"
                        type="text"
                        placeholder="Nazwa postu"
                        value={postName}
                        onChange={(e) => setPostName(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="post-description">
                        Opis Postu
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="post-description"
                        placeholder="Opis postu"
                        value={postDescription}
                        onChange={(e) => setPostDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Dodaj Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPost;
