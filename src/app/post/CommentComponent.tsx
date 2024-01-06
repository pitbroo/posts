import React from 'react';

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

interface UserData {
    id: number;
    token: string;
    firstName: string;
    lastName: string;
    username: string;
}

interface CommentComponentProps {
    comment: Comment;
    userData: UserData;
    onCommentDeleted: () => void;
}

const CommentComponent: React.FC<CommentComponentProps> = ({ comment, userData, onCommentDeleted }) => {
    const getRandomAvatarUrl = () => {
        return `https://robohash.org/${Math.random().toString(36).substring(7)}`;
    };

    const handleDeleteComment = async () => {
        const confirmed = window.confirm('Czy na pewno chcesz usunąć ten komentarz?');
        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(`https://localhost:7102/comments/${comment.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${userData.token}` // Dodanie nagłówka autoryzacyjnego
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            onCommentDeleted();
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <li className="mb-2 text-gray-700 flex items-center">
            <img src={getRandomAvatarUrl()} alt="Commenter's Avatar"
                 className="w-6 h-6 rounded-full mr-2 border border-gray-300"/>
            <div className="flex-grow">
                {comment.text}
                <p className="text-sm text-gray-500">Comment by: {comment.author.firstName} {comment.author.lastName}</p>
            </div>
            {comment.author.id === userData.id && (
                <button
                    onClick={handleDeleteComment}
                    className="ml-2 text-red-500 hover:text-red-700"
                >
                    Usuń
                </button>
            )}
        </li>
    );
};

export default CommentComponent;
