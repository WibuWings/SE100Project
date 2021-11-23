import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    NavLink
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Login.css'
import { BsFillEnvelopeFill, BsLockFill } from "react-icons/bs";
import { FiChevronRight } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { Avatar } from '@mui/material'
import { IconContext } from "react-icons";
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appId: "543752153590340",
            clientId: "826925109796-mi95l41fi57bdlolpvnfdg5bpt9oc81h.apps.googleusercontent.com",
        }
    }

    loadAllGood(dataProduct, dataJoin) {
        var resultProduct = dataProduct;
        var joinTypeInfor = dataJoin;
     
        var listProductInfor = [];
        for (let i = 0; i < resultProduct.length; i++) {
            var typeIDList = [];
            var joinType = '';
            for (var j = 0; j < joinTypeInfor.length; j++) {
                if (resultProduct[i]._id.productID && joinTypeInfor[j]._id.productID &&
                    resultProduct[i]._id.productID === joinTypeInfor[j]._id.productID) 
                {
                    typeIDList.push(joinTypeInfor[j]._id.typeID);
                }
            }
    
            listProductInfor.push(
                {
                    ...resultProduct[i],
                    typeIDList: typeIDList,
                });
        }
        this.props.getProductToReducer(listProductInfor);
      }

    // Login with google
    onLoginSuccess = async (res) => {
        this.props.setRole();
        await axios.post(`http://localhost:5000/sign-in-with-google`, res.profileObj)
            .then(res => {
                console.log("thành công");
                console.log(res.data);
                switch (res.data.status) {
                    case 1:
                        localStorage.setItem('token', res.data.token);
                        this.props.updateProfile(res.data.data);
                        this.props.updateAvatar(res.data.data.manager.imgUrl ? res.data.data.manager.imgUrl : "https://res.cloudinary.com/databaseimg/image/upload/v1634091995/sample.jpg");
                        this.props.updateShiftTypes(res.data.data.shiftTypes);
                        this.props.updateRecieptUser(res.data.data.receipts);
                        this.props.changeLoginStatus();
                        this.props.getTimeKeeping(res.data.data.timeKeeping);
                        this.loadAllGood(res.data.data.products, res.data.data.productJoinTypes);
                        this.props.hideAlert();
                        this.props.showAlert(res.data.message, "success");
                        break;
                    case -1:
                        this.props.hideAlert();
                        this.props.showAlert(res.data.message, "error");
                        break;
                    default:
                        break;
                }
            })
            .catch(err => {
                this.props.hideAlert();
                this.props.showAlert("Error, server don't active", "error");
            })
    }

    // Check để thay đổi trạng thái đã login hay chưa
    isLoginCheck = async (e) => {
        this.props.setRole();
        if (this.blurEmail() && this.blurPassword()) {
            await axios.post(`http://localhost:5000/sign-in-with-gmail-password`, {
                email: document.querySelector('#email').value,
                password: document.getElementById('password').value,
            })
                .then(res => {
                    console.log(res.data);
                    switch (res.data.status) {
                        case 1:
                            localStorage.setItem('token', res.data.token);
                            this.props.updateProfile(res.data.data);
                            this.props.updateAvatar(res.data.data.manager.imgUrl ? res.data.data.manager.imgUrl : "https://res.cloudinary.com/databaseimg/image/upload/v1634091995/sample.jpg");
                            this.props.updateShiftTypes(res.data.data.shiftTypes);
                            this.props.updateRecieptUser(res.data.data.receipts);
                            this.props.changeLoginStatus();
                            this.props.getEmployee(res.data.data.employees);
                            this.props.getTimeKeeping(res.data.data.timeKeeping);
                            this.loadAllGood(res.data.data.products, res.data.data.productJoinTypes);
                            this.props.hideAlert();
                            this.props.showAlert(res.data.message, "success");
                            break;
                        case -1:
                            this.props.hideAlert();
                            this.props.showAlert(res.data.message, "error");
                            break;
                        default:
                            break;
                    }
                })
                .catch(err => {
                    this.props.hideAlert();
                    this.props.showAlert("Error system", "error");
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
                data: data,
            })
        },
        setRole: () => {
            dispatch({
                type: "ADMIN_ROLE"
            });
        },
        updateAvatar: (avatar) => {
            dispatch({
                type: "UPDATE_AVATAR",
                avatar: avatar,
            })
        },
        updateShiftTypes: (shiftTypes) => {
            dispatch({
                type: "UPDATE_DATA_SHIFT_USER",
                shiftTypes: shiftTypes,
            })
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
        getEmployee: (data) => {
            dispatch({
                type: "GET_EMPLOYEE",
                employees: data,
            });
          },
        updateShiftTypes: (shiftTypes) => {
            dispatch({
                type: "UPDATE_DATA_SHIFT_USER",
                shiftTypes: shiftTypes,
            })
        },
        updateRecieptUser: (data) => {
            dispatch({
                type: "UPDATE_RECIEPT_USER",
                listReciept: data,
            })
        },
        getTimeKeeping: (data) => {
            dispatch({
              type: "GET_TIMEKEEPER",
              data: data
            });  
          },
        getProductToReducer: (data) => {
            dispatch({
                type: "GET_PRODUCT_AND_TYPE",
                data: data
            });
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);