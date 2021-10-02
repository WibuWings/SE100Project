import React, { Component } from 'react';

import {connect} from 'react-redux';
import { 
    AiOutlineDashboard,
    AiFillDashboard,
    AiOutlineContainer,
    AiFillContainer
} from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { BsFillPeopleFill,BsInfoCircleFill} from "react-icons/bs";
import { 
    IoPeopleOutline,
    IoPeopleSharp,
    IoReceiptOutline,
    IoReceiptSharp
} from "react-icons/io5";
import { RiProfileFill, RiProfileLine } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";

import Kurisu from '../../img/kurisu.jpg';
import { NavLink } from 'react-router-dom';

import '../../CSS/DashBoard.css'


class SideNavBar extends Component {
    render() {
        return (
            <div>
                <div class="navibar sidebar">
                    <div class="nav-heading">
                        <img src={Kurisu} style ={{width: 50, height: 50, borderRadius: '100%'}}></img>
                        <span class="user-name" style ={{marginLeft: 10, color: '#fff'}}>Makise Kurisu</span>
                    </div>
                    <div class="nav-container">
                        <NavLink className="nav-item" to="/dashboard">
                            <AiOutlineDashboard class="nav-item-icon"/>
                            <AiFillDashboard class="nav-item-icon icon-activate"/>   
                            <span>Dashboard</span>
                        </NavLink>
                        <NavLink to='/profile' className="nav-item" href='#'>
                            <RiProfileLine class="nav-item-icon"/>
                            <RiProfileFill class="nav-item-icon icon-activate"/>
                            <span>Profile</span>
                        </NavLink>
                        <NavLink to='/employeemanager' className="nav-item" href='#'>
                            <IoPeopleOutline class="nav-item-icon"/>
                            <IoPeopleSharp class="nav-item-icon icon-activate"/>
                            <span>Employee Manager</span>
                        </NavLink>
                        <NavLink to="/goodmanager" className="nav-item" href='#'>
                            <AiOutlineContainer className="nav-item-icon"/>
                            <AiFillContainer className="nav-item-icon icon-activate"/>
                            <span>Goods Manager</span>
                        </NavLink>
                        <NavLink to="/receiptmanager" className="nav-item" href='#'>
                            <IoReceiptOutline class="nav-item-icon"/>
                            <IoReceiptSharp class="nav-item-icon icon-activate"/>
                            <span>Receipt Manager</span>
                        </NavLink>
                    </div>
                    
                    <div class="nav-footer">
                        <NavLink to="/login" onClick={() => this.props.changeLoginStatus()} className="nav-item" style={{flex: 5}}>
                            <FaSignOutAlt class="nav-item-icon"/>
                            <span>Sign out</span>
                        </NavLink>
                        <a href="#" className="nav-item" style={{flex: 4}}>
                            <BsInfoCircleFill class="nav-item-icon"/>
                            <span>About</span>
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
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeLoginStatus: () => {
            dispatch({
                type: "CHANGE_LOGIN_STATUS",
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar);