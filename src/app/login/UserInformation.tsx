import React from 'react';
interface UserInformationProps {
    userData: UserData;
    onLogout: () => void;
}
interface UserData {
    username: string;
    avatarUrl?: string;
    firstName: string;
    lastName: string;
    role: string;
}

const UserInformation: React.FC<UserInformationProps> = ({ userData, onLogout }) => {
    if (!userData) return null;

    const { firstName, lastName, role, avatarUrl, username } = userData;
    const getRandomAvatarUrl = () => {
        return `https://robohash.org/${Math.random().toString(36).substring(7)}`;
    };

    return (
        <div className="fixed top-0 right-0 p-2 flex items-center bg-white shadow-md rounded-lg">
            <img src={getRandomAvatarUrl()} alt="avatar" className="w-10 h-10 rounded-full mr-2" />
            <div className="flex flex-col mr-4">
                <span className="font-bold">{firstName} {lastName}</span>
                <span className="text-sm text-gray-600">{role}</span>
            </div>
            <button onClick={onLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                Wyloguj
            </button>
        </div>
    );
};

export default UserInformation;
