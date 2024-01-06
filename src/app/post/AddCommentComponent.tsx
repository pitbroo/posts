import React, { useState } from 'react';
interface UserData {
    id: number;
    token: string;
    firstName: string;
    lastName: string;
    username: string;
}

interface AddCommentComponentProps {
    postId: number;
    userData: UserData;
    onCommentAdded: () => void;
}

const AddCommentComponent: React.FC<AddCommentComponentProps> = ({ postId, userData, onCommentAdded }) => {
    const [newCommentText, setNewCommentText] = useState('');
    const handleAddComment = async () => {
        try {
            const response = await fetch(`https://localhost:7102/comments/${postId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userData.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: newCommentText, userId: userData.id })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setNewCommentText('');
            onCommentAdded();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="mt-4">
            <textarea
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-gray-600 text-base leading-relaxed"
                placeholder="Add a comment..."
            />
            <button
                onClick={handleAddComment}
                className="mt-2 text-blue-500 hover:text-blue-700"
            >
                Add Comment
            </button>
        </div>
    );
};

export default AddCommentComponent;
