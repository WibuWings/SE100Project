import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    NavLink
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CSS/Login.css'
import { BsFillEnvelopeFill, BsLockFill } from "react-icons/bs";
import {  FiXSquare,FiChevronLeft } from "react-icons/fi";
import {FaUserTie} from 'react-icons/fa'
import { Avatar } from '@mui/material'
import { IconContext } from "react-icons";
import axios from 'axios';
import Alert from '@mui/material/Alert';

class LoginWithEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusFailed: false,
            statusSucces: false,
        }
    }

    message = "Login success";

    // Out Alert
    OutAlert = () => {
        this.setState({
            statusFailed: false,
            statusSucces: false,
        })
    }

    // Check để thay đổi trạng thái đã login hay chưa
    isLoginCheck = (e) => {
        this.OutAlert();
        const form = document.getElementById('login-form');
        if (this.blurEmail() && this.blurPassword()) {
            axios.post(`http://localhost:5000/sign-in-employee`, {
                username: document.querySelector('#username').value,
                password: document.getElementById('password').value,
            })
                .then(res => {
                    switch (res.data.status) {
                        case 1:
                            this.message = res.data.message;
                            this.setState({
                                statusSucces: true,
                            })
                            localStorage.setItem('token', res.data.token);
                            this.props.changeLoginStatus();
                            break;
                        case -1:
                            this.message = res.data.message;
                            this.setState({
                                statusFailed: true,
                            })
                            break;
                        default:
                            break;
                    }
                })
                .catch(err => {
                    this.message = "Enter again";
                    this.setState({
                        statusFailed: true,
                    })
                })
        }
    }


    // Handle user : blur , change in input
    blurEmail = () => {
        const event = document.querySelector('#username');
        let elementValue = event.value;
        const formGroup = event.parentElement.parentElement;
        // check validate
        if (elementValue === "") {
            formGroup.className = 'invalid form-group'
            formGroup.querySelector('.form-message').innerText = "Please enter this field";
            return false;
        } else {
            formGroup.classList.remove('invalid');
            formGroup.querySelector('.form-message').innerText = "";
            return true;
        }
    }


    blurPassword = () => {
        const e = document.getElementById('password');
        let elementValue = e.value;
        const formGroup = e.parentElement.parentElement;
        if (elementValue === "") {
            formGroup.className = 'invalid form-group'
            formGroup.querySelector('.form-message').innerText = "Please enter this field"
            return false;
        } else if (e.value.length < 6) {
            formGroup.className = 'invalid form-group'
            formGroup.querySelector('.form-message').innerText = "Enter at least 6 characters";
            return false;
        } else {
            formGroup.classList.remove('invalid');
            formGroup.querySelector('.form-message').innerText = "";
            return true;
        }
    }

    changeInput = (e) => {
        const formGroup = e.target.parentElement.parentElement;
        formGroup.classList.remove('invalid');
        formGroup.querySelector('.form-message').innerText = "";
    }


    render() {
        const enterPress = this.isLoginCheck;
        document.onkeydown = function (e) {
            switch (e.which) {
                case 13:
                    enterPress(e);
                    break;
                default:
                    break;
            }
        }

        return (
            <div className="Login">
                <div className="form-login">
                    <div className="auth-form">
                        <Avatar className="auth-form__avatar">
                            <IconContext.Provider value={{ color: "blue", size: "3em", className: "global-class-name" }}>
                                <FaUserTie></FaUserTie>
                            </IconContext.Provider>
                        </Avatar>
                        <div className="auth-form__container">
                            <div className="auth-form__header">
                                <div className="auth-form__heading">Employee</div>
                                <NavLink to="/login" className="auth-form__switch-btn"> <FiChevronLeft className="auth-form__arrow-return"></FiChevronLeft>Login</NavLink>
                            </div>
                        </div>
                        <div className="auth-form__body">
                            <form action="/login-submit" method="POST" id="login-form">
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Username</label>
                                    <div className="input-custom">
                                        <span><BsFillEnvelopeFill className="input-custom-icon" /></span>
                                        <input className="form-control" onChange={(e) => this.changeInput(e)} onBlur={() => this.blurEmail()} name="username"  id="username" placeholder="VD: phuoc123" type="text" />
                                    </div>
                                    <span className="form-message" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-custom">
                                        <span>
                                            <BsLockFill className="input-custom-icon" ></BsLockFill>
                                        </span>
                                        <input className="form-control" onChange={(e) => this.changeInput(e)} onBlur={(e) => this.blurPassword(e)} name="password"  id="password" placeholder="Emter password" type="password" />
                                    </div>
                                    <span className="form-message" />
                                </div>
                                <div className="auth-form__btn">
                                    <div to="/thungan" id="navlink" onClick={(e) => this.isLoginCheck(e)} className="auth-form__btn-log-in auth-form__switch-btn">Sign In</div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {this.state.statusSucces ? <Alert onClick={() => this.OutAlert()} className="message-error" severity="success">{this.message} — check it out! <FiXSquare></FiXSquare></Alert> : null}
                {this.state.statusFailed ? <Alert onClick={() => this.OutAlert()} className="message-error" severity="error">{this.message} — check it out! <FiXSquare></FiXSquare></Alert> : null}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLogin: state.loginStatus,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeLoginStatus: () => {
            dispatch({
                type: "CHANGE_LOGIN_STATUS",
            });
        }
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(LoginWithEmployee);