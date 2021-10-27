import React, { Component } from 'react';
import ProfileHeader from './ProfileHeader';
import '../../css/Profile.css';
import { Container, Grid } from '@mui/material';
import ProfileDetail from './ProfileDetail';
import ChangePassword from './ChangePassword';
import ListShift from './ListShift';
import ProfileSetting from './ProfileSetting';
import ModalAdd from './ModalAdd';
import Regulation from './Regulation';
import { connect } from 'react-redux'

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFindPassword: this.props.infoUser._id.includes("_Google") ? true : false,
        }
    }


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
                            {this.state.isFindPassword ? null : <ChangePassword></ChangePassword>}
                            <ProfileSetting></ProfileSetting>
                        </Grid>
                        <Grid item md={12} sm={12}  >
                            <Regulation></Regulation>
                        </Grid>
                        <Grid item sm={12} md={12} >
                            <ListShift></ListShift>
                        </Grid>
                    </Grid>
                </Container>
                {this.props.addStatus ? (<div className="modal-add">
                    <div onClick={() => { this.props.changeAddStatus(); if (this.props.editShiftStatus) { this.props.changeEditShiftStatus() } }} className="modal-overlay"></div>
                    <ModalAdd></ModalAdd>
                </div>) : null}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        addStatus: state.addStatus,
        editShiftStatus: state.editShiftStatus,
        infoUser: state.infoUser,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddStatus: () => {
            dispatch({
                type: "CHANGE_ADD_STATUS",
            });
        },
        changeEditShiftStatus: () => {
            dispatch({
                type: "CHANGE_EDIT_SHIFT_STATUS",
            })
        }
    }
}





export default connect(mapStateToProps, mapDispatchToProps)(Profile);