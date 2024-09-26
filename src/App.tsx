import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserProfile from './components/UserProfile';
import UserActivities from './components/UserActivities';
import './App.css';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
}

interface Activity {
    id: number;
    title: string;
}

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get<User>('https://jsonplaceholder.typicode.com/users/1');
                const activitiesResponse = await axios.get<Activity[]>('https://jsonplaceholder.typicode.com/posts?userId=1');

                setUser(userResponse.data);
                setActivities(activitiesResponse.data);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="App">
            {user && <UserProfile user={user} />}
            <UserActivities activities={activities} />
        </div>
    );
};

export default App;