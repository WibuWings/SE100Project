import React, { Component } from 'react';
import ProfileHeader from './Profile/ProfileHeader';
import '../CSS/Profile.css';
import { Container, Grid } from '@mui/material';
import ProfileDetail from './Profile/ProfileDetail';
import ProfileAvt from './Profile/ProfileAvt';


class Profile extends Component {
    render() {
        return (
            <div className="profile" >
                <ProfileHeader></ProfileHeader>
                <Container maxWidth="xl">
                    <Grid className="profile-body" container  spacing={2}>
                        <Grid item xs={8} >
                            <ProfileDetail></ProfileDetail>
                        </Grid>
                        <Grid item xs={4} >
                            <ProfileAvt></ProfileAvt>
                        </Grid>
                    </Grid>
                </Container>

            </div>
        );
    }
}

export default Profile;