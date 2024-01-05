import React, { useState } from 'react';

interface AddPostProps {
    userData: UserData;
    onAddPostSuccess: (post: any) => void;
}
interface UserData{
    id: number
    token: string;
    firstName: string;
    lastName: string;
    username: string;
}


const AddPost: React.FC<AddPostProps> = ({ userData, onAddPostSuccess }) => {
    const [postName, setPostName] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newPost = {
            name: postName,
            description: postDescription,
            userId: userData.id
        };

        try {
            const response = await fetch('https://localhost:7102/Post', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userData.token}`,
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
        <div className="bg-gray-50 shadow-md rounded-lg px-6 py-3 mb-4">
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        className="form-input w-full rounded-md border-gray-300 shadow-sm"
                        id="post-name"
                        type="text"
                        placeholder="Tytuł postu"
                        value={postName}
                        onChange={(e) => setPostName(e.target.value)}
                    />
                </div>
                <div>
                    <textarea
                        className="form-textarea w-full rounded-md border-gray-300 shadow-sm"
                        id="post-description"
                        placeholder="Opis postu"
                        value={postDescription}
                        onChange={(e) => setPostDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
