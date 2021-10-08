import React, { Component } from 'react';
import ProfileHeader from './ProfileHeader';
import '../../CSS/Profile.css';
import { Container, Grid } from '@mui/material';
import ProfileDetail from './ProfileDetail';
import ChangePassword from './ChangePassword';
import ListShift from './ListShift';
import ProfileSetting from './ProfileSetting';
import ModalAdd from './ModalAdd';


class Profile extends Component {
    render() {
        return (
            <div className="profile" style={{overflow:'scroll', overflowX: 'hidden', height:'100vh'}}>
                <ProfileHeader></ProfileHeader>
                <Container style={{marginBottom: '20px'}} maxWidth="xl">
                    <Grid className="profile-body" container  spacing={2}>
                        <Grid  item xs={8} >
                            <ProfileDetail></ProfileDetail>
                        </Grid>
                        <Grid item xs={4} >
                            <ChangePassword></ChangePassword>
                            <ProfileSetting></ProfileSetting>
                        </Grid>
                        <Grid item xs={12} >
                            <ListShift></ListShift>
                        </Grid>
                        <Grid item xs={6} >
                            <ModalAdd></ModalAdd>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default Profile;