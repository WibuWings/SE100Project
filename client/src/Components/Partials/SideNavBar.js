import React, { Component } from 'react';
import '../../CSS/DashBoard.css'
import { 
    AiOutlineDashboard,
    AiOutlineContainer
} from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { BsFillPeopleFill } from "react-icons/bs";
import { 
    IoPeopleOutline,
    IoReceiptOutline
} from "react-icons/io5";


class SideNavBar extends Component {
    render() {
        return (
            <div>
                <div class="navbar sidebar">
                    <a href="#" class="nav-item">
                        <AiOutlineDashboard/>   
                        <span>Dashboard</span>
                    </a>
                    <a href="#" class="nav-item">
                        <ImProfile/>
                        <span>Profile</span>
                    </a>
                    <a href="#" class="nav-item">
                        <IoPeopleOutline />
                        <span>Employee Manager</span>
                    </a>
                    <a href="#" class="nav-item">
                        <AiOutlineContainer/>
                        <span>Goods Manager</span>
                    </a>
                    <a href="#" class="nav-item">
                        <IoReceiptOutline/>
                        <span>Receipt Manager</span>
                    </a>
                </div>
            </div>
        );
    }
}

export default SideNavBar;