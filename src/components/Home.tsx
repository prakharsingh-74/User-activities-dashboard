import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeComponent: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome to User Profiles</h1>
            <p>Click the button below to see the user profile and their activities:</p>
            <button onClick={() => navigate('/users/1')}>Start to see</button>
        </div>
    );
};

export default HomeComponent;