import React, { Component } from 'react';
import { BsFillEnvelopeFill, BsLockFill,BsBoxArrowInLeft, BsCodeSlash} from "react-icons/bs";
import {
    Link,
    NavLink
} from "react-router-dom";
class ForgotPassword extends Component {
    
    
    render() {
        return (
            <div className="Login">
                <div className="form-login">
                    <div className="auth-form">
                        <div className="auth-form__container">
                            <div className="auth-form__header">
                                <div className="auth-form__heading">Find password</div>
                                <NavLink onclick="" to="/login" className="auth-form__switch-btn"><BsBoxArrowInLeft className="arrow-return"></BsBoxArrowInLeft></NavLink>
                            </div>
                        </div>
                        <div className="auth-form__body">
                            <form action method="post" id="login-form">
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <div className="input-custom">
                                        <span><BsFillEnvelopeFill className="input-custom-icon" /></span>
                                        <input className="form-control" onblur="" name="email" rules="required|email" id="email" placeholder="Ex: abc@gmail.com" type="text" />
                                    </div>
                                    <span className="form-message" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="code" className="form-label">Code</label>
                                    <div className="input-custom">
                                        <span><BsCodeSlash className="input-custom-icon" /></span>
                                        <input className="form-control" onblur="" name="code" rules="required|email" id="email" placeholder="Ex: ABC321" type="text" />
                                        <button type="button" class="btn btn-primary send-code">Send code</button>
                                    </div>
                                    <span className="form-message" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="form-label">New password</label>
                                    <div className="input-custom">
                                        <span>
                                            <BsLockFill className="input-custom-icon" ></BsLockFill>
                                        </span>
                                        <input className="form-control" onblur="" name="password" rules="required|min:6" id="password" placeholder="Emter password" type="password" />
                                    </div>
                                    <span className="form-message" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="form-label">Re-password</label>
                                    <div className="input-custom">
                                        <span>
                                            <BsLockFill className="input-custom-icon" ></BsLockFill>
                                        </span>
                                        <input className="form-control" onblur="" name="password" rules="required|min:6" id="re-password" placeholder="Emter password" type="password" />
                                    </div>
                                    <span className="form-message" />
                                </div>
                                <div className="auth-form__btn">
                                    <NavLink to="/login" className="auth-form__btn-log-in auth-form__switch-btn">Find Password</NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ForgotPassword;
