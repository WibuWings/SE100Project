import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Link,
    NavLink
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Login.css';
import { BsFillEnvelopeFill, BsLockFill } from "react-icons/bs";

class Login extends Component {
    hash = () => {
        var bcrypt = require('bcryptjs');
        var pass = "lngthinphc"
        var hash = bcrypt.hashSync(pass, 12)
        var verified = bcrypt.compareSync("lngthinphc", hash);
        return hash + verified;
    }

    render() {
        return (
            <div className="Login">
                <div className="form-login">
                    <div className="auth-form">
                        <div className="auth-form__container">
                            <div className="auth-form__header">
                                <div className="auth-form__heading">Login</div>
                                <NavLink onclick="" to="/register" className="auth-form__switch-btn">Register</NavLink>
                            </div>
                        </div>
                        <div className="auth-form__body">
                            <form action="/home" method="get" id="login-form">
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <div className="input-custom">
                                        <span><BsFillEnvelopeFill className="input-custom-icon" /></span>
                                        <input className="form-control" onblur="" name="email" rules="required|email" id="email" placeholder="VD: abc@gmail.com" type="text" />
                                    </div>
                                    <span className="form-message" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-custom">
                                        <span>
                                            <BsLockFill className="input-custom-icon" ></BsLockFill>
                                        </span>
                                        <input className="form-control" onblur="" name="password" rules="required|min:6" id="password" placeholder="Emter password" type="password" />
                                    </div>
                                    <span className="form-message" />
                                </div>
                                <div className="auth-form__support">
                                    <span className="auth-form__support-forget">
                                        <NavLink onclick="" to="/forgot" className="auth-form__switch-btn">Forgot password</NavLink>
                                    </span>
                                    <span className="auth-form__help-separate" />
                                    <span className="auth-form__support-need-support">Need help?</span>
                                </div>
                                <div className="auth-form__btn">
                                    <NavLink to="/home" onClick={() => this.props.changeLoginStatus()} className="auth-form__btn-log-in auth-form__switch-btn">Sign In</NavLink>
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
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);