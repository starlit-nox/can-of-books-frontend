import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    if (!isAuthenticated) {
        return <div>Loading...</div>; // Rendering indicator
    }

    return (
        <div>
            <h2>Profile</h2>
            <img src={user.picture} alt="Profile" />
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default Profile;