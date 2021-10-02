import React, { Component } from 'react';
import '../../CSS/DashBoard.css'
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
                        <a href="#" class="nav-item">
                            <AiOutlineDashboard class="nav-item-icon"/>
                            <AiFillDashboard class="nav-item-icon icon-activate"/>   
                            <span>Dashboard</span>
                        </a>
                        <a href="#" class="nav-item">
                            <RiProfileLine class="nav-item-icon"/>
                            <RiProfileFill class="nav-item-icon icon-activate"/>
                            <span>Profile</span>
                        </a>
                        <a href="#" class="nav-item">
                            <IoPeopleOutline class="nav-item-icon"/>
                            <IoPeopleSharp class="nav-item-icon icon-activate"/>
                            <span>Employee Manager</span>
                        </a>
                        <a href="#" class="nav-item">
                            <AiOutlineContainer class="nav-item-icon"/>
                            <AiFillContainer class="nav-item-icon icon-activate"/>
                            <span>Goods Manager</span>
                        </a>
                        <a href="#" class="nav-item">
                            <IoReceiptOutline class="nav-item-icon"/>
                            <IoReceiptSharp class="nav-item-icon icon-activate"/>
                            <span>Receipt Manager</span>
                        </a>
                    </div>
                    
                    <div class="nav-footer">
                        <a href="#" class="nav-item" style={{flex: 5}}>
                            <FaSignOutAlt class="nav-item-icon"/>
                            <span>Sign out</span>
                        </a>
                        <a href="#" class="nav-item" style={{flex: 4}}>
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