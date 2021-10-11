import React, { Component } from 'react';
import ProfileHeader from './ProfileHeader';
import '../../CSS/Profile.css';
import { Container, Grid } from '@mui/material';
import ProfileDetail from './ProfileDetail';
import ChangePassword from './ChangePassword';
import ListShift from './ListShift';
import ProfileSetting from './ProfileSetting';
import ModalAdd from './ModalAdd';
import {connect} from 'react-redux'

class Profile extends Component {
    render() {
        return (
            <div className="profile" style={{ overflow: 'scroll', overflowX: 'hidden', height: '100vh' }}>
                <ProfileHeader></ProfileHeader>
                <Container style={{ marginBottom: '20px' }} maxWidth="xl">
                    <Grid className="profile-body" container spacing={2}>
                        <Grid item md={8} sm={12}  >
                            <ProfileDetail></ProfileDetail>
                        </Grid>
                        <Grid item md={4} sm={12} >
                            <ChangePassword></ChangePassword>
                            <ProfileSetting></ProfileSetting>
                        </Grid>
                        <Grid item sm={12} md={12} >
                            <ListShift></ListShift>
                        </Grid>
                    </Grid>
                </Container>
                {this.props.addStatus ? (<div className="modal-add">
                    <div onClick={() => this.props.changeAddStatus()} className="modal-overlay"></div>
                    <ModalAdd></ModalAdd>
                </div>): null}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        addStatus: state.addStatus,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddStatus: () => {
            dispatch({
                type: "CHANGE_ADD_STATUS",
            });
        }
    }
}





export default  connect(mapStateToProps , mapDispatchToProps) (Profile);