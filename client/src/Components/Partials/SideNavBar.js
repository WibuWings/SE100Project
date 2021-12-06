import React, { Component } from 'react';

import { connect } from 'react-redux';
import {
    AiOutlineDashboard,
    AiFillDashboard,
    AiOutlineContainer,
    AiFillContainer
} from "react-icons/ai";
import { Button } from '@mui/material';
import { BsInfoCircleFill } from "react-icons/bs";
import {
    IoPeopleOutline,
    IoPeopleSharp,
    IoReceiptOutline,
    IoReceiptSharp,
} from "react-icons/io5";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im"
import { IoIosArrowBack , IoIosArrowForward} from "react-icons/io";
import { RiProfileFill, RiProfileLine } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import { GiSellCard } from 'react-icons/gi'
import Avatar from '../../img/avatar_default.jpg';
import { NavLink } from 'react-router-dom';
import '../../css/SideNavBar.css';
import axios from 'axios';

class SideNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            change: true,
            attendance: false,
        }
        this.getInitialScreen();
        console.log("openSidebar", this.props.sidebarOpen);
    }
    active = ['active', '', '', '', '', ''];

    changeIndex(index) {
        for (var i = 0; i < this.active.length; i++) {
            this.active[i] = '';
        }
        this.active[index] = 'active';
        this.setState({ change: !this.state.change });
    }

    getInitialScreen() {
        var link = window.location.href;
        link = link.substring(link.lastIndexOf('/') + 1);

        for (var i = 0; i < this.active.length; i++) {
            this.active[i] = '';
        }

        switch (link) {
            case "profile":
                this.active[1] = 'active';
                break;
            case "employeemanager":
                this.active[2] = 'active';
                break;
            case "goodmanager":
                this.active[3] = 'active';
                break;
            case "import":
                this.active[3] = 'active';
                break;
            case "receiptmanager":
                this.active[4] = 'active';
                break;
            case "sellproduct":
                this.active[5] = 'active';
                break;
            default:
                this.active[0] = 'active';
                break;
        }
        this.setState({ change: !this.state.change });
    }

    attendance = () => {
        this.setState({
            attendance: true,
        })
        this.props.hideAlert()
        this.props.showAlert('Attendanced success', 'success')
    }

    logOut = () => {
        localStorage.setItem('token', null)
        this.props.resetInfoUser()
        this.props.resetRecieptUser()
        this.props.resetShiftUser()
        this.props.changeLoginStatus()
    }

    attendance = () => {
        var time = new Date();
        let a = ((time.getHours() > 12) ? time.getHours() - 12 : time.getHours()) + ":" + time.getMinutes() +" "+ ((time.getHours() > 12) ? "PM" : "AM");
        axios.post('http://localhost:5000/api/employee/time-keeping',{
            token: localStorage.getItem('token'),
            data: {
                email: this.props.infoUser.employeeID,
                time: a,
            }
        }).then(res => {
            console.log(res)
            localStorage.setItem('token', res.data.token)
            this.props.showAlert(res.data.message, 'success')
            this.setState({
                attendance: true
            })
        }).catch(err => {
            this.props.showAlert(err.response.data.message, 'error')
        })
    }

    hideNavbar() {
        // console.log("Chạy được hàm ẩn rồi");
        // // // console 
        // const navbarContainer = document.querySelector('.navbar-container');
        const navbarContainer = document.querySelector('.navbar-container');
        navbarContainer.classList.add('short');
        this.props.closeSidebar();
    }

    showNavbar() {
        // console.log("Chạy được hàm ẩn rồi");
        // // // console 
        const navbarContainer = document.querySelector('.navbar-container');
        navbarContainer.classList.remove('short');
        this.props.openSidebar();
    }

    render() {
        return (
            <div
                class="navbar-container"
            >
                <div style={{ backgroundColor: !this.props.statusDarkmode ? '#fafafa' : '#37474f' }} class="navibar sidebar">
                    <div className="nav-icon" >
                        {
                            this.props.sidebarOpen ?
                            <IoIosArrowBack
                                size={20}
                                onClick={(e) => this.hideNavbar()}
                            />
                            :
                            <IoIosArrowForward
                                style={{
                                    position: 'fixed',
                                    left: '42px',
                                    top: '56px',
                                }}
                                size={20}
                                onClick={(e) => this.showNavbar()}
                            />
                        }
                    </div>
                    <div class="nav-heading">
                        <div style={{ 
                                backgroundColor: !this.props.sidebarOpen? '#fafafa': !this.props.statusDarkmode ? '#cfd8dc' : '#455a64',
                                paddingTop: !this.props.sidebarOpen? 10: 8,

                            }} 
                            class="navbar-heading-container"
                        >
                            <img class='user-avatar'src={this.props.infoUser.avatar ? this.props.infoUser.avatar : Avatar} style={{ width: 40, height: 40, borderRadius: '100%' }}></img>
                            <span class="user-name" style={{ color: !this.props.statusDarkmode ? 'black' : 'white', fontWeight: '700' }} >{this.props.infoUser.lastName + " " + this.props.infoUser.firstName}</span>
                        </div>
                    </div>
                    <div class="nav-container">
                        {
                            this.props.role == true ? (null)
                                : (<div style={{ justifyContent: 'center', display: 'flex', marginBottom: '10px' }}>
                                    <Button onClick={() => this.attendance()} style={{ backgroundColor: this.state.attendance ? '#b9f6ca' : '#e0e0e0', color: '#424242' }}>
                                        {!this.state.attendance ? (<ImCheckboxUnchecked style={{ marginRight: '10px' }}></ImCheckboxUnchecked>)
                                            : (<ImCheckboxChecked style={{ marginRight: '10px', color: '#1b5e20' }}></ImCheckboxChecked>)
                                        }

                                        {this.state.attendance ? 'attendanced' : 'attendance'}
                                    </Button>
                                </div>
                                )
                        }
                        {
                            this.props.role == true ?
                                (<NavLink className={"nav-item " + this.active[0]} to="/dashboard"
                                    onClick={() => this.changeIndex(0)}
                                >
                                    <AiOutlineDashboard class="nav-item-icon" />
                                    <AiFillDashboard class="nav-item-icon icon-activate" />
                                    <span className="nav-item-lable">Dashboard</span>
                                </NavLink>) : (null)
                        }
                        <NavLink to="/profile" className={"nav-item " + this.active[1]} href="#"
                            onClick={() => this.changeIndex(1)}
                        >
                            <RiProfileLine class="nav-item-icon" />
                            <RiProfileFill class="nav-item-icon icon-activate" />
                            <span className="nav-item-lable">Profile</span>
                        </NavLink>

                        {
                            this.props.role === true ?
                                (
                                    <div>
                                        <NavLink
                                            to="/employeemanager"
                                            className={"nav-item " + this.active[2]}
                                            href="#"
                                            onClick={() => this.changeIndex(2)}
                                        >
                                            <IoPeopleOutline class="nav-item-icon" />
                                            <IoPeopleSharp class="nav-item-icon icon-activate" />
                                            <span className="nav-item-lable">Employee Manager</span>
                                        </NavLink>
                                        <NavLink
                                            to="/goodmanager"
                                            className={"nav-item " + this.active[3]}
                                            href="#"
                                            onClick={() => this.changeIndex(3)}
                                        >
                                            <AiOutlineContainer className="nav-item-icon" />
                                            <AiFillContainer className="nav-item-icon icon-activate" />
                                            <span className="nav-item-lable">Goods Manager</span>
                                        </NavLink>
                                        <NavLink
                                            to="/receiptmanager"
                                            className={"nav-item " + this.active[4]}
                                            href="#"
                                            onClick={() => this.changeIndex(4)}
                                        >
                                            <IoReceiptOutline class="nav-item-icon" />
                                            <IoReceiptSharp class="nav-item-icon icon-activate" />
                                            <span className="nav-item-lable">Receipt Manager</span>
                                        </NavLink>
                                    </div>
                                ) : (null)
                        }

                        <NavLink to="/sellproduct" className={"nav-item " + this.active[5]} href='#'
                            onClick={() => this.changeIndex(5)}
                        >
                            <GiSellCard class="nav-item-icon" />
                            <GiSellCard class="nav-item-icon icon-activate" />
                            <span className="nav-item-lable">Sell Product</span>
                        </NavLink>
                    </div>

                    <div class="nav-footer">
                        <a
                            to="/login"
                            onClick={() => this.logOut()}
                            className={"nav-item "}
                            style={{ flex: 5 }}
                        >
                            <FaSignOutAlt class="nav-item-icon" />
                            <span className="nav-item-lable">Sign out</span>
                        </a>
                        <a href="#" className={"nav-item "} onClick={() => this.props.changeConfirmPasswordTest()} style={{ flex: 4 }}>
                            <BsInfoCircleFill class="nav-item-icon" />
                            <span className="nav-item-lable">About</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLogin: state.loginStatus,
        infoUser: state.infoUser,
        role: state.role,
        statusDarkmode: state.statusDarkmode,
        sidebarOpen: state.sidebarOpen,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeLoginStatus: () => {
            dispatch({
                type: "CHANGE_LOGIN_STATUS",
            })
        },
        resetShiftUser: () => {
            dispatch({
                type:"RESET_SHIFT_USER"
            })
        },
        resetRecieptUser: () => {
            dispatch({
                type: "RESET_ALL_RECIEPT_USER",
            })
        },
        changeConfirmPasswordTest: () => {
            dispatch({
                type: "CHANGE_MODAL_CONFIRM_PASSWORD_STATUS",
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
        resetInfoUser: () => {
            dispatch({
                type: "RESET_INFO_USER"
            })
        },
        closeSidebar: () => {
            dispatch({
                type: "CLOSE_SIDEBAR"
            })
        },
        openSidebar: () => {
            dispatch({
                type: "OPEN_SIDEBAR"
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar);
