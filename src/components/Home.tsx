import React from 'react';
import './Home.css';

const HomeComponent: React.FC = () => {
    return (
        <div className="home">
            <div className="welcome-message">
                <h2>Welcome to the User Profile Dashboard!</h2>
                <p>Discover user profiles and their activities effortlessly.</p>
            </div>
            <button className="start-button" onClick={() => window.location.href = '/users/1'}>
                Get Started
            </button>
        </div>
    );
};

export default HomeComponent;