import React, { Component } from 'react';
import ProfileHeader from './Profile/ProfileHeader';
import '../CSS/Profile.css';


class Profile extends Component {
    render() {
        return (
            <div className="profile" >
                <ProfileHeader></ProfileHeader>
            </div>
        );
    }
}

export default Profile;