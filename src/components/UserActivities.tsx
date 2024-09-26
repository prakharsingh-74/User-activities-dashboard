import React from 'react';

interface Activity {
    id: number;
    title: string;
}

const UserActivities: React.FC<{ activities: Activity[] }> = ({ activities }) => {
    return (
        <div className="user-activities">
            <h2>User Activities</h2>
            <ul>
                {activities.map(activity => (
                    <li key={activity.id}>{activity.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserActivities;