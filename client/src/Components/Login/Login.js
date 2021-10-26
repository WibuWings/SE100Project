import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    NavLink
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Login.css'
import { BsFillEnvelopeFill, BsLockFill } from "react-icons/bs";
import { FiChevronRight, FiXSquare } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { Avatar } from '@mui/material'
import { IconContext } from "react-icons";
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import Alert from '@mui/material/Alert';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appId: "543752153590340",
            clientId: "826925109796-mi95l41fi57bdlolpvnfdg5bpt9oc81h.apps.googleusercontent.com",
            statusFailed: false,
            statusSucces: false,
        }
    }

    message = "";

    // Login with google
    onLoginSuccess = (res) => {
        this.OutAlert();
        this.props.setRole();
        axios.post(`http://localhost:5000/sign-in-with-google`, res.profileObj)
            .then(res => {
                console.log("thành công");
                console.log(res.data);
                switch (res.data.status) {
                    case 1:
                        localStorage.setItem('token', res.data.token);
                        const data = {
                            email: res.data._id,
                            firstName: res.data.data.firstName ? res.data.data.firstName : "",
                            lastName: res.data.data.lastName ? res.data.data.lastName : "",
                            old: res.data.data.old ? res.data.data.old : "",
                            gender: res.data.data.gender ? res.data.data.gender : "0",
                            storeName: res.data.data.storeName ? res.data.data.storeName : "",
                            tel: res.data.data.phoneNumber ? res.data.data.phoneNumber : "",
                            province: res.data.data.province ? res.data.data.province : "0",
                            district: res.data.data.district ? res.data.data.district : "0",
                            address: res.data.data.address ? res.data.data.address : "",
                        }
                        this.props.updateProfile(data);
                        this.props.updateAvatar(res.data.data.imgUrl);
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
                this.message = "Error, server don't active";
                this.setState({
                    statusFailed: true,
                })
            })
    }

    onFailureSuccess = (res) => {
        this.setState({
            statusFailed: true,
            statusSucces: false,
        })
    }

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
        this.props.setRole();
        if (this.blurEmail() && this.blurPassword()) {
            axios.post(`http://localhost:5000/sign-in-with-gmail-password`, {
                email: document.querySelector('#email').value,
                password: document.getElementById('password').value,
            })
                .then(res => {
                    console.log(res.data);
                    console.log(res.data.email);
                    switch (res.data.status) {
                        case 1:
                            localStorage.setItem('token', res.data.token);
                            const data = {
                                email: res.data.email ? res.data.email : res.data.data._id,
                                firstName: res.data.data.firstName ? res.data.data.firstName : "cc",
                                lastName: res.data.data.lastName ? res.data.data.lastName : "abc",
                                old: res.data.data.old ? res.data.data.old : "",
                                gender: res.data.data.gender ? res.data.data.gender : "0",
                                storeName: res.data.data.storeName ? res.data.data.storeName : "",
                                tel: res.data.data.phoneNumber ? res.data.data.phoneNumber : "",
                                salary: res.data.data.salary ? res.data.data.salary : "",
                                province: res.data.data.province ? res.data.data.province : "0",
                                district: res.data.data.district ? res.data.data.district : "0",
                                address: res.data.data.address ? res.data.data.address : "",
                            }
                            this.props.updateAvatar(res.data.data.imgUrl);
                            this.props.updateProfile(data);
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
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const event = document.querySelector('#email');
        let elementValue = event.value;
        const formGroup = event.parentElement.parentElement;
        // check validate
        if (elementValue === "") {
            formGroup.className = 'invalid form-group'
            formGroup.querySelector('.form-message').innerText = "Please enter this field";
            return false;
        } else if (!regex.test(elementValue)) {
            formGroup.className = 'invalid form-group'
            formGroup.querySelector('.form-message').innerText = "Email is not in the correct format";
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

    
    componentWillMount() {
        document.title = 'Login'
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
                                <BiUser></BiUser>
                            </IconContext.Provider>
                        </Avatar>
                        <div className="auth-form__container">
                            <div className="auth-form__header">
                                <div className="auth-form__heading">Login</div>
                                <NavLink to="/register" className="auth-form__switch-btn">Register <FiChevronRight className="auth-form__arrow-return"></FiChevronRight></NavLink>
                            </div>
                        </div>
                        <div className="auth-form__body">
                            <form action="/login-submit" method="POST" id="login-form">
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <div className="input-custom">
                                        <span><BsFillEnvelopeFill className="input-custom-icon" /></span>
                                        <input className="form-control" onChange={(e) => this.changeInput(e)} onBlur={() => this.blurEmail()} name="email" rules="required|email" id="email" placeholder="VD: abc@gmail.com" type="text" />
                                    </div>
                                    <span className="form-message" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-custom">
                                        <span>
                                            <BsLockFill className="input-custom-icon" ></BsLockFill>
                                        </span>
                                        <input className="form-control" onChange={(e) => this.changeInput(e)} onBlur={(e) => this.blurPassword(e)} name="password" rules="required|min:6" id="password" placeholder="Emter password" type="password" />
                                    </div>
                                    <span className="form-message" />
                                </div>
                                <div className="auth-form__support">
                                    <span className="auth-form__support-forget">
                                        <NavLink to="/forgot" className="auth-form__switch-btn">Forgot password</NavLink>
                                    </span>
                                    <span className="auth-form__help-separate" />
                                    <span className="auth-form__support-need-support">Need help?</span>
                                </div>
                                <div className="auth-form__support">
                                    <GoogleLogin
                                        className="auth-form__support-google"
                                        clientId={this.state.clientId}
                                        buttonText="Login with Google"
                                        onSuccess={this.onLoginSuccess}
                                        onFailure={this.onFailureSuccess}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </div>
                                <div className="auth-form__btn">
                                    <div to="/home" id="navlink" onClick={(e) => this.isLoginCheck(e)} className="auth-form__btn-log-in auth-form__switch-btn">Sign In</div>
                                </div>
                                <div className="auth-form__btn">
                                    <NavLink to="/employee" id="navlink" className="auth-form__btn-log-in auth-form__switch-btn auth-form-employee">
                                        Employee
                                        <FiChevronRight className="auth-form__arrow-return"></FiChevronRight>
                                    </NavLink>
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
        },
        updateProfile: (data) => {
            dispatch({
                type: "UPDATA_DATA_USER",
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                old: data.old,
                gender: data.gender,
                storeName: data.storeName,
                tel: data.tel,
                province: data.province,
                district: data.district,
                address: data.address,
            })
        },
        setRole: () => {
            dispatch({
                type: "ADMIN_ROLE"
            });
            localStorage.setItem('role', 'admin');
        },
        updateAvatar: (avatar) => {
            dispatch({
                type: "UPDATE_AVATAR",
                avatar: avatar,
            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);