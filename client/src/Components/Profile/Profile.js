import React, { Component } from 'react';
import ProfileHeader from './ProfileHeader';
import '../../css/Profile.css';
import { Container, Grid, Button } from '@mui/material';
import ProfileDetail from './ProfileDetail';
import ChangePassword from './ChangePassword';
import ListShift from './ListShift';
import ProfileSetting from './ProfileSetting';
import ModalAdd from './ModalAdd';
import ProfileCoupon from './ProfileCoupon';
import Regulation from './Regulation';
import { connect } from 'react-redux'
import ModalAddCoupon from './ModalAddCoupon';
import axios from 'axios';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFindPassword: (this.props.infoUser._id == null) ? false : (this.props.infoUser._id.includes("_Google") ? true : false),
        }
    }

    deleteDataAccout = async () => {
        axios.post('http://localhost:5000/api/profile/delete-account', {
            email: this.props.infoUser.email,
            token: localStorage.getItem('token'),
        })
            .then(res => {
            })
            .catch(err => {
            })
    }


    componentWillMount() {
        document.title = 'Profile'
    }
    render() {
        return (
            <div id="scroll-bar" className="profile" style={{ overflow: 'scroll', overflowX: 'hidden', height: '100vh' }}>
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
                        {
                            !this.props.role ? null : (
                                <Grid item md={12} sm={12}  >
                                    <Regulation></Regulation>
                                </Grid>
                            )
                        }
                        {!this.props.role ? null : (
                            <Grid item sm={12} md={12} >
                                <ListShift></ListShift>
                            </Grid>
                        )}
                        {!this.props.role ? null : (
                            <Grid item sm={12} md={12} >
                                <ProfileCoupon></ProfileCoupon>
                            </Grid>
                        )}
                        {!this.props.role ? null : (
                            <Grid item sm={12} md={12} >
                                <Button onClick={() => this.deleteDataAccout()} style={{ backgroundColor: 'red', width: '100%', color: 'white' }}>Delete Data Account</Button>
                            </Grid>
                        )}

                    </Grid>
                </Container>
                {this.props.addStatus ? (<div className="modal-add">
                    <div onClick={() => { this.props.changeAddStatus(); if (this.props.editShiftStatus) { this.props.changeEditShiftStatus() } }} className="modal-overlay"></div>
                    <ModalAdd></ModalAdd>
                </div>) : null}
                {
                    this.props.statusModalAddCoupon ? (
                        <div className="modal-add">
                            <div onClick={() => {this.props.changeStatusModalAddCoupon() ; if (this.props.statusEditCoupon) { this.props.changeStatusEditCoupon()}}} className="modal-overlay"></div>
                            <ModalAddCoupon></ModalAddCoupon>
                        </div>
                    ) : null
                }

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        addStatus: state.addStatus,
        editShiftStatus: state.editShiftStatus,
        infoUser: state.infoUser,
        role: state.role,
        statusDarkmode: state.statusDarkmode,
        statusModalAddCoupon: state.statusModalAddCoupon,
        statusEditCoupon: state.statusEditCoupon,
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
        },
        changeStatusModalAddCoupon: () => {
            dispatch({
                type: "CHANGE_ADD_COUPON_STATUS"
            })
        },
        changeStatusEditCoupon: () => {
            dispatch({
                type: "CHANGE_EDIT_COUPON_STATUS"
            })
        }
    }
}





export default connect(mapStateToProps, mapDispatchToProps)(Profile);