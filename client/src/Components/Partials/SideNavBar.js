import React, { Component } from 'react';
import '../../CSS/DashBoard.css'
import { 
    AiOutlineDashboard,
    AiFillDashboard,
    AiOutlineContainer
} from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { BsFillPeopleFill,BsInfoCircleFill} from "react-icons/bs";
import { 
    IoPeopleOutline,
    IoReceiptOutline
} from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";

import Kurisu from '../../img/kurisu.jpg';

class SideNavBar extends Component {
    render() {
        return (
            <div>
                <div class="navibar sidebar">
                    <div class="nav-heading">
                        <img src={Kurisu} style ={{width: 60, height: 60, borderRadius: '100%'}}></img>
                        <span class="user-name" style ={{marginLeft: 10, color: '#fff'}}>Makise Kurisu</span>
                    </div>
                    <a href="#" class="nav-item">
                        <AiOutlineDashboard class="nav-item-icon"/>
                        <AiFillDashboard class="nav-item-icon icon-activate"/>   
                        <span>Dashboard</span>
                    </a>
                    <a href="#" class="nav-item">
                        <ImProfile class="nav-item-icon"/>
                        <span>Profile</span>
                    </a>
                    <a href="#" class="nav-item">
                        <IoPeopleOutline class="nav-item-icon"/>
                        <span>Employee Manager</span>
                    </a>
                    <a href="#" class="nav-item">
                        <AiOutlineContainer class="nav-item-icon"/>
                        <span>Goods Manager</span>
                    </a>
                    <a href="#" class="nav-item">
                        <IoReceiptOutline class="nav-item-icon"/>
                        <span>Receipt Manager</span>
                    </a>
                    <div class="nav-footer">
                        <a href="#" class="nav-item">
                            <FaSignOutAlt class="nav-item-icon"/>
                            <span>Sign out</span>
                        </a>
                        <a href="#" class="nav-item">
                            <BsInfoCircleFill class="nav-item-icon"/>
                            <span>About</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default SideNavBar;