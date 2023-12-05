import React from 'react';
import { UserProfile } from './accountTypes';

interface UserDetailsProps {
    profile: UserProfile;
}

const UserDetails: React.FC<UserDetailsProps> = ({ profile }) => {
    return (
        <div className="my-4 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">Profile Details</h2>
            <p className="text-gray-600">Name: {profile.name}</p>
            <p className="text-gray-600">Email: {profile.email}</p>
        </div>
    );
};

export default UserDetails;