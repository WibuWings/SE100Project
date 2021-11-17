import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    NavLink
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Login.css'
import { BsFillEnvelopeFill, BsLockFill } from "react-icons/bs";
import { FiXSquare, FiChevronLeft } from "react-icons/fi";
import { FaUserTie } from 'react-icons/fa'
import { Avatar } from '@mui/material'
import { IconContext } from "react-icons";
import axios from 'axios';
import Alert from '@mui/material/Alert';

class LoginWithEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }




    // Check để thay đổi trạng thái đã login hay chưa
    isLoginCheck = async (e) => {
        this.props.setRole();
        if (this.blurEmail() && this.blurPassword()) {
            await axios.post(`http://localhost:5000/sign-in-employee`, {
                email: document.querySelector('#username').value,
                password: document.getElementById('password').value,
            })
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        localStorage.setItem('token', res.data.token);
                        this.props.updateProfile(res.data.data.employee[0], res.data.data.manager[0], res.data.data.store[0].storeName);
                        this.props.updateAvatar(res.data.data.employee[0].imgUrl ? res.data.data.employee[0].imgUrl : "https://res.cloudinary.com/databaseimg/image/upload/v1634091995/sample.jpg");
                        this.props.updateRecieptUser(res.data.data.reciept);
                        this.props.changeLoginStatus();
                        this.props.hideAlert();
                        this.props.showAlert(res.data.message, "success");
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.props.hideAlert();
                    this.props.showAlert("The email IS NOT registered or you entered the WRONG password.", "error");
                    return;
                })
            // Get các thông tin để thêm vào redux
            
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

    componentWillMount() {
        document.title = 'Employee'
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
                                        <input className="form-control" onChange={(e) => this.changeInput(e)} onBlur={() => this.blurEmail()} name="username" id="username" placeholder="VD: phuoc123" type="text" />
                                    </div>
                                    <span className="form-message" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-custom">
                                        <span>
                                            <BsLockFill className="input-custom-icon" ></BsLockFill>
                                        </span>
                                        <input className="form-control" onChange={(e) => this.changeInput(e)} onBlur={(e) => this.blurPassword(e)} name="password" id="password" placeholder="Emter password" type="password" />
                                    </div>
                                    <span className="form-message" />
                                </div>
                                <div className="auth-form__btn">
                                    <div to="/sellproduct" id="navlink" onClick={(e) => this.isLoginCheck(e)} className="auth-form__btn-log-in auth-form__switch-btn">Sign In</div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
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
        setRole: () => {
            dispatch({
                type: "EMPLOYEE_ROLE",
            });
        },
        showAlert: (message, typeMessage) => {
            dispatch({
                type: "SHOW_ALERT",
                message: message,
                typeMessage: typeMessage,
            })
        },
        hideAlert: () => {
            dispatch({
                type: "HIDE_ALERT",
            })
        },
        updateProfile: (data, data1, storeName) => {
            dispatch({
                type: "UPDATA_DATA_EMPLOYEE",
                data: data,
                data1: data1,
                storeName: storeName,
            })
        },
        setProfile: (data) => {
            dispatch({
                type: "SET_DATA_USER",
                data: data,
            })
        },
        updateAvatar: (avatar) => {
            dispatch({
                type: "UPDATE_AVATAR",
                avatar: avatar,
            })
        },
        updateRecieptUser: (data) => {
            dispatch({
                type: "UPDATE_RECIEPT_USER",
                listReciept: data,
            })
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginWithEmployee);