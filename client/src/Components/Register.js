import React, { Component } from 'react';
import '../CSS/Login.css'
import {
    Link,
    NavLink
} from "react-router-dom";
import { connect } from 'react-redux';
import { BsFillEnvelopeFill, BsLockFill } from "react-icons/bs";
import { FaPhoneSquare } from "react-icons/fa";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass: "",
            tel: "",
        }
    }
    

    blurEmail = (e) => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const elementValue = e.target.value;
        const formGroup = e.target.parentElement.parentElement;
        this.setState({
            email: elementValue,
        })
        if (elementValue === "") {
            formGroup.className = 'invalid form-group'
            formGroup.querySelector('.form-message').innerText = "Please enter this field";
        } else if (!regex.test(elementValue)) {
            formGroup.className = 'invalid form-group'
            formGroup.querySelector('.form-message').innerText = "Email is not in the correct format";
        } else {
            formGroup.classList.remove('invalid');
            formGroup.querySelector('.form-message').innerText = "";
        }
    }

    blurPassword = (e) => {
        const elementValue = e.target.value;
        const formGroup = e.target.parentElement.parentElement;
        this.setState({
            pass: elementValue,
        })
        if (elementValue === "") {
            formGroup.className = 'invalid form-group'
            formGroup.querySelector('.form-message').innerText = "Please enter this field";
        } else if (e.target.value.length < 6) {
            formGroup.className = 'invalid form-group'
            formGroup.querySelector('.form-message').innerText = "Enter at least 6 characters";
        } else {
            formGroup.classList.remove('invalid');
            formGroup.querySelector('.form-message').innerText = "";
        }
    }

    blurRePassword = (e) => {
        const elementValue = e.target.value;
        const formGroup = e.target.parentElement.parentElement;
        if (elementValue === "") {
            formGroup.className = 'invalid form-group'
            formGroup.querySelector('.form-message').innerText = "Please enter this field";
        } else if (e.target.value !== this.state.pass) {
            formGroup.className = 'invalid form-group'
            formGroup.querySelector('.form-message').innerText = "Re-password not correct";
        } else {
            formGroup.classList.remove('invalid');
            formGroup.querySelector('.form-message').innerText = "";
        }
    }

    blurTel = (e) => {
        const elementValue = e.target.value;
        const formGroup = e.target.parentElement.parentElement;
        const regex = /^\d+$/;
        this.setState({
            tel: elementValue,
        })
        if (elementValue === "") {
            formGroup.className = 'invalid form-group'
            formGroup.querySelector('.form-message').innerText = "Please enter this field";
        } else if (!regex.test(elementValue)) {
            formGroup.className = 'invalid form-group'
            formGroup.querySelector('.form-message').innerText = "Phone is not in the correct format";
        } else {
            formGroup.classList.remove('invalid');
            formGroup.querySelector('.form-message').innerText = "";
        }
    }

    changeInput = (e) => {
        const elementValue = e.target.value;
        const formGroup = e.target.parentElement.parentElement;
        formGroup.classList.remove('invalid');
        formGroup.querySelector('.form-message').innerText = "";
    }

    render() {
        return (
            <div className="Login">
                <div className="form-login">
                    <div className="auth-form">
                        <div className="auth-form__container">
                            <div className="auth-form__header">
                                <div className="auth-form__heading">Register</div>
                                <NavLink onclick="" to="/login" className="auth-form__switch-btn">Login</NavLink>
                            </div>
                        </div>
                        <div className="auth-form__body">
                            <form action="/home" method="post" id="login-form">
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <div className="input-custom">
                                        <span><BsFillEnvelopeFill className="input-custom-icon" /></span>
                                        <input className="form-control" onChange={(e) => this.changeInput(e)} onBlur={(e) => this.blurEmail(e)} name="email" rules="required|email" id="email" placeholder="VD: abc@gmail.com" type="text" />
                                    </div>
                                    <span className="form-message" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-custom">
                                        <span>
                                            <BsLockFill className="input-custom-icon" ></BsLockFill>
                                        </span>
                                        <input className="form-control" onChange={(e) => this.changeInput(e)} onBlur={(e) => this.blurPassword(e)}  name="password" rules="required|min:6" id="password" placeholder="Emter password" type="password" />
                                    </div>
                                    <span className="form-message" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="re-password" className="form-label">Password</label>
                                    <div className="input-custom">
                                        <span>
                                            <BsLockFill className="input-custom-icon" ></BsLockFill>
                                        </span>
                                        <input className="form-control" onChange={(e) => this.changeInput(e)} onBlur={(e) => this.blurRePassword(e)} name="re-password" id="re-password" placeholder="Emter re-password" type="password" />
                                    </div>
                                    <span className="form-message" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="form-label">Tel</label>
                                    <div className="input-custom">
                                        <span>
                                            <FaPhoneSquare className="input-custom-icon" ></FaPhoneSquare>
                                        </span>
                                        <input className="form-control" onBlur={(e) => this.blurTel(e)} onChange={(e) => this.changeInput(e)} name="tel" rules="required" id="tel" placeholder="Ex: 0303030303" type="tel" />

                                    </div>
                                    <span className="form-message" />
                                </div>
                                <div className="auth-form__btn">
                                    <NavLink to="/home" className="auth-form__btn-log-in auth-form__switch-btn">Sign Up</NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);