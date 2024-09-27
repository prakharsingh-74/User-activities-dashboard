import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import UserProfile from './components/UserProfile';
import UserActivities from './components/UserActivities';
import HomeComponent from './components/Home';
import './App.css';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
}

const App: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersResponse = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
                setUsers(usersResponse.data);
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const UserProfilePage = () => {
        const { id } = useParams<{ id: string }>();
        const userIndex = Number(id) - 1;
        const navigate = useNavigate();

        const handleNext = () => {
            if (userIndex < users.length - 1) {
                navigate(`/users/${users[userIndex + 1].id}`);
            }
        };

        const handlePrevious = () => {
            if (userIndex > 0) {
                navigate(`/users/${users[userIndex - 1].id}`);
            }
        };

        useEffect(() => {
            if (userIndex < 0 || userIndex >= users.length) {
                navigate('/');
            }
        }, [userIndex, navigate, users.length]);

        if (userIndex < 0 || userIndex >= users.length) {
            return <div>User not found</div>;
        }

        return (
            <div className="UserProfilePage">
                <UserProfile user={users[userIndex]} />
                <UserActivities userId={users[userIndex].id} />
                <div className="navigation">
                    <button onClick={handlePrevious} disabled={userIndex <= 0}>Previous</button>
                    <button onClick={handleNext} disabled={userIndex >= users.length - 1}>Next</button>
                </div>
            </div>
        );
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeComponent />} />
                <Route path="/users/:id" element={<UserProfilePage />} />
            </Routes>
        </Router>
    );
};

export default App;