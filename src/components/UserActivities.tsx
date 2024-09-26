// src/UserActivities.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Activity {
    id: number;
    title: string;
}

interface UserActivitiesProps {
    userId: number;
}

const UserActivities: React.FC<UserActivitiesProps> = ({ userId }) => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get<Activity[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
                setActivities(response.data);
            } catch (err) {
                setError('Failed to fetch activities');
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, [userId]);

    if (loading) return <div>Loading activities...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>User Activities</h2>
            <ul>
                {activities.map((activity) => (
                    <li key={activity.id}>{activity.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserActivities;