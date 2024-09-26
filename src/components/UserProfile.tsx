import React from 'react';

interface User {
    name: string;
    email: string;
    phone: string;
}

const UserProfile: React.FC<{ user: User }> = ({ user }) => {
    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
        </div>
    );
};

export default UserProfile;