import React from "react";
import { useAuth } from "../AuthContext";

const Profile = () => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="profile-card">
            <h2>My Profile</h2>
            <p>
                <b>Name:</b> {user.name}
            </p>
            <p>
                <b>Email:</b> {user.email}
            </p>
            <p>
                <b>Role:</b> {user.role}
            </p>
        </div>
    );
};

export default Profile;
