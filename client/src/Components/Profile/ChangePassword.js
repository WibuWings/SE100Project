import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, Button, CardContent } from '@mui/material';
import axios from 'axios';
import {connect} from 'react-redux'
import { FaCommentsDollar } from 'react-icons/fa';
var bcrypt = require('bcryptjs');

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCurPass: false,
            isNewPass: false,
            isRePass: false,
            isChangePass: false,
        }
    }

    messCurPass = ""
    messNewPass = ""
    messRePass = ""
    curPass = ""
    newPass = ""
    rePass = ""

    // Gọi api change password
    changePassword = async () => {
        if(this.props.role == false){ 
            if(this.curPass != this.props.infoUser.password)
            {
                this.props.hideAlert();
                this.props.showAlert("Not a correct pass", "error");
                return;
            }
            console.log("this.props.infoUser", this.props.infoUser);
            const data = {
                token: localStorage.getItem('token'),
                employee: {
                    _id: {
                        employeeID: this.props.infoUser.employeeID,
                        storeID: this.props.infoUser.managerID,
                    },
                    managerID: this.props.infoUser.managerID,
                    password: this.newPass,
                    firstName: this.props.infoUser.firstName,
                    lastName: this.props.infoUser.lastName,
                    phoneNumber: this.props.infoUser.tel,
                    email: this.props.infoUser.email,
                    address: this.props.infoUser.address,
                    cardID: this.props.infoUser.cardID,
                }   
            }
            console.log(data);
            axios.put(`http://localhost:5000/api/employee`, data)
            .then(res => {
                console.log("Update pass success");
                this.props.hideAlert();
                this.props.showAlert("Change password success", "success");
            })
            .catch(err => {
                console.log(err);
            })
        }
        else {
            const form = document.getElementById('form-change-password');
            const data = {
                token: localStorage.getItem('token'),
                email: this.props.infoUser.email,
                curPass: this.curPass,
                newPass: this.hash(this.newPass),
            }
            await axios.post(`http://localhost:5000/api/profile/change-password`,data)
            .then(res => {
                if (res.data.status === -1) {
                    this.props.hideAlert();
                    this.props.showAlert(res.data.message, "error");
                } else {
                    form.reset();
                    localStorage.setItem('token', res.data.token);
                    this.props.hideAlert();
                    this.props.showAlert("Change password success", "success");
                }
            })
            .catch(err => {
                this.props.changeLoginStatus();
                this.props.hideAlert();
                this.props.showAlert("Login timeout, signin again", "warning");
            })
        }
        
    }

    // hash
    hash = (pass) => {
        var hash = bcrypt.hashSync(pass, 12)
        return hash;
    }

    // Handele : blur, change
    blurCurPassword = (e) => {
        this.curPass= e.target.value;
        if (e.target.value === "") {
            this.setState({
                isCurPass: false,
                isChangePass: false,
            })
            return;
        } else if (e.target.value.length < 6) {
            this.messCurPass = "Enter at least 6 characters";
            this.setState({
                isCurPass: true,
                isChangePass: false,
            })
        } else {
            this.messCurPass = "";
            this.setState({
                isCurPass: false,
            })
            if(this.newPass.length>5 && this.newPass === this.rePass){
                this.setState({
                    isChangePass: true,
                })
            }
        }
    }

    blurNewPassword = (e) => {
        this.blurRePassword(e);
        this.newPass = e.target.value;
        if (e.target.value === "") {
            this.setState({
                isNewPass: false,
                isChangePass: false,
            })
            return;
        } else if (e.target.value.length < 6) {
            this.messNewPass = "Enter at least 6 characters";
            this.setState({
                isNewPass: true,
            })
        } else {
            this.messCurPass = "";
            this.setState({
                isNewPass: false,
            })
            this.blurRePassword(e);
            if (this.rePass === this.newPass && this.curPass.length > 5){
                this.setState({
                    isChangePass: true,
                })
            }
        }
    }

    blurRePassword = (e) => {
        this.rePass = document.querySelector('input[name="re-password"]').value
        if (this.rePass !== this.newPass) {
            this.messRePass = "Re-password not correct";
            this.setState({
                isRePass: true,
                isChangePass: false,
            })
        } else {
            this.messRePass = "";
            this.setState({
                isRePass: false,
            })
            if (this.rePass === this.newPass && this.curPass.length > 5){
                this.setState({
                    isChangePass: true,
                })
            }
        }
    }

    render() {
        return (
            <form id="form-change-password" style={{marginBottom: '15px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: !this.props.statusDarkmode? '#0091ea' :'white', backgroundColor: !this.props.statusDarkmode? '#efeeef' :'#455a64'}} title="Change Password" />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12}>
                                <TextField
                                    variant="standard"
                                    fullWidth
                                    name="cur-password"
                                    label="Current password"
                                    onBlur={(e) => this.blurCurPassword(e)}
                                    error={this.state.isCurPass}
                                    helperText={this.messCurPass}
                                    type="password"
                                    required
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <TextField
                                    fullWidth
                                    label="New password"
                                    name="new-password"
                                    required
                                    onBlur={(e) => this.blurNewPassword(e)}
                                    error={this.state.isNewPass}
                                    helperText={this.messNewPass}
                                    type="password"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <TextField
                                    fullWidth
                                    label="New password again"
                                    onBlur={(e) => this.blurRePassword(e)}
                                    error={this.state.isRePass}
                                    helperText={this.messRePass}
                                    name="re-password"
                                    required
                                    type="password"
                                    variant="standard"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                        <Button color="primary" disabled={!this.state.isChangePass} onClick={() => this.changePassword()} variant="contained">Change</Button>
                    </Box>
                </Card>
            </form>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        infoUser: state.infoUser,
        statusDarkmode: state.statusDarkmode,
        role: state.role,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showAlert: (message, typeMessage) => {
            dispatch({
                type: "SHOW_ALERT",
                message: message,
                typeMessage: typeMessage,
            })
        },
        changeLoginStatus: () => {
            dispatch({
                type: "CHANGE_LOGIN_STATUS",
            });
        },
        hideAlert: () => {
            dispatch({
                type: "HIDE_ALERT",
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);