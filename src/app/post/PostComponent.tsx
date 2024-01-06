import React, {useEffect, useState} from 'react';
import AddPost from "@/app/post/AddPost";
import CommentComponent from "@/app/post/CommentComponent";
import AddCommentComponent from "@/app/post/AddCommentComponent";

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

interface Post {
    id: number;
    name: string;
    description: string;
    photo: string;
    comments: Comment[];
    author: Author;
}

interface UserData {
    id: number;
    token: string;
    firstName: string;
    lastName: string;
    username: string;
}

interface PostComponentProps {
    userData: UserData;
}


const PostComponent: React.FC<PostComponentProps> = ({ userData }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [editingPostId, setEditingPostId] = useState<number | null>(null);
    const [editedName, setEditedName] = useState<string>('');
    const [editedDescription, setEditedDescription] = useState<string>('');


    const fetchPosts = async () => {
        try {
            const response = await fetch('https://localhost:7102/post', {
                headers: {
                    'Authorization': `Bearer ${userData.token}`
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

    useEffect(() => {
        fetchPosts();
    }, [userData.token]);

    const startEditing = (post: Post) => {
        setEditingPostId(post.id);
        setEditedName(post.name);
        setEditedDescription(post.description);
    };
    const handleEditChange = (field: 'name' | 'description', value: string) => {
        if (field === 'name') {
            setEditedName(value);
        } else {
            setEditedDescription(value);
        }
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch(`https://localhost:7102/post/${editingPostId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${userData.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: editedName,
                    description: editedDescription
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === editingPostId
                        ? { ...post, name: editedName, description: editedDescription }
                        : post
                )
            );
            setEditingPostId(null);
        } catch (error) {
            console.error('Error saving edited post:', error);
        }
    };
    const handleAddPostSuccess = (newPost: Post) => {
        fetchPosts();
    };

    const getRandomPhotoUrl = (id: number) => {
        return `https://source.unsplash.com/random/600x400?sig=${id}`;
    };

    function generateRandomDate() {
        const start = new Date(2024, 0, 1).getTime();
        const end = new Date().getTime();
        const randomTime = start + Math.random() * (end - start);
        return new Date(randomTime).toLocaleDateString();
    }

    const getRandomAvatarUrl = () => {
        return `https://robohash.org/${Math.random().toString(36).substring(7)}`;
    };

    const handleDeletePost = async (postId: number) => {
        const isConfirmed = window.confirm("Czy na pewno chcesz usunąć ten post?");
        if (!isConfirmed) {
            return;
        }

        try {
            const response = await fetch(`https://localhost:7102/post/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${userData.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };



    return (
        <div className="container mx-auto p-6 w-5/8">
            <AddPost userData={userData} onAddPostSuccess={handleAddPostSuccess} />
            {posts.map((post) => (
                <div key={post.id} className="mb-8 p-6 bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img src={getRandomAvatarUrl()} alt="Author's Avatar"
                                 className="w-8 h-8 rounded-full mr-2 border border-gray-300" />
                            <p className="text-sm text-gray-500">Posted by: {post.author.firstName} {post.author.lastName}</p>
                        </div>
                        <p className="text-gray-500">{generateRandomDate()}</p>
                    </div>
                    <img src={getRandomPhotoUrl(post.id)} alt="Post"
                         className="mt-4 mb-4 max-w-full h-auto rounded-md border border-gray-300" />

                    <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                            {editingPostId === post.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editedName}
                                        onChange={(e) => handleEditChange('name', e.target.value)}
                                        className="text-3xl font-semibold text-gray-800 mb-4 w-full border-0 p-0" />
                                    <button onClick={handleSaveEdit} className="text-green-500 hover:text-green-700 ml-2">
                                        Save
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">{post.name}</h2>
                                    {post.author.id === userData.id && (
                                        <div className="flex items-center">
                                            <button onClick={() => startEditing(post)} className="text-blue-500 hover:text-blue-700">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDeletePost(post.id)} className="text-red-500 hover:text-red-700 ml-2">
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        {editingPostId !== post.id && (
                            <p className="text-gray-600 text-base leading-relaxed">{post.description}</p>
                        )}
                        <textarea
                            value={editedDescription}
                            onChange={(e) => handleEditChange('description', e.target.value)}
                            className={`text-gray-600 text-base leading-relaxed w-full p-2 border border-gray-300 rounded ${editingPostId === post.id ? '' : 'hidden'}`} />
                    </div>

                    {post.comments.map((comment) => (
                        <CommentComponent
                            key={comment.id}
                            comment={comment}
                            userData={userData} // Przekazanie danych użytkownika
                            onCommentDeleted={() => fetchPosts()} // Załadowanie postów ponownie po usunięciu komentarza
                        />
                    ))}
                    <AddCommentComponent postId={post.id} userData={userData} onCommentAdded={fetchPosts} />
                </div>
            ))}
        </div>
    );


};

export default PostComponent;
