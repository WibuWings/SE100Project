import React, { Component } from 'react';
import avatarImg from '../../img/avatar_default.jpg'
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { BiEditAlt } from "react-icons/bi";
import { FaTelegramPlane } from "react-icons/fa";
class ProfileHeader extends Component {
    render() {
        return (
            <div className="profile-header" style={{ width: '100%', height: '300px' }}>
                <Avatar
                    className="profile-header__avt"
                    src={avatarImg}
                    sx={{ width: 100, height: 100, border: '5px solid #9999996b', }}
                ></Avatar>
                
                <div className="profile-header-des">
                    <h2 className="profile-header__name">
                        Thiện Phước
                    </h2>
                    <BiEditAlt className="profile-header__icon"></BiEditAlt>
                </div>
                <div style={{display: 'flex', fontSize:'1rem', color:"white"}}>
                    <FaTelegramPlane className="profile-header__icon-tel"></FaTelegramPlane>
                    <p className="profile-header__tel">0387527010</p>
                </div>
                <Divider className="profile-header__divider"></Divider>
            </div>
        );
    }
}

export default ProfileHeader;