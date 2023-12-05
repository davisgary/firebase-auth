import React, { useEffect, useState } from 'react';
import { PageProps } from 'gatsby';
import { getUserProfile } from '../../firebase';
import UserDetail from '../components/account/UserDetail';
import { useAuth } from '../components/auth/AuthContext';

const AccountPage: React.FC<PageProps> = () => {
    const [userProfile, setUserProfile] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth(); // Use the user from AuthContext

    useEffect(() => {
        if (user) {
            console.log("User is logged in, fetching profile..."); // Debugging line
            getUserProfile(user.uid) // Use UID from the user object
                .then(profile => {
                    console.log("Profile fetched:", profile); // Debugging line
                    setUserProfile(profile);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching user profile:", error);
                    setLoading(false);
                });
        } else {
            console.log("No user logged in."); // Debugging line
            setLoading(false);
        }
    }, [user]); // Depend on the user from AuthContext

    if (loading) {
        return <p>Loading user profile...</p>;
    }

    if (!userProfile) {
        return <p>No user profile available. Please log in.</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center my-4">User Account</h1>
            <UserDetail profile={userProfile} />
        </div>
    );
};

export default AccountPage;