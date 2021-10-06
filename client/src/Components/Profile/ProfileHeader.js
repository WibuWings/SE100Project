import React, { Component } from 'react';
import avatarImg from '../../img/kurisu.jpg'
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider'
import { BiEditAlt, BiReceipt } from "react-icons/bi";

class ProfileHeader extends Component {
    render() {
        return (
            <div className="profile-header" style={{ width: '100%', height: '350px' }}>
                <Avatar
                    className="profile-header__avt"
                    src={avatarImg}
                    sx={{ width: 100, height: 100, border: '5px solid #9999996b', }}
                ></Avatar>
                <h2 className="profile-header__name">
                    Thiện Phước
                </h2>
                <div className="profile-header-des">
                    <p className="profile-header__description">Description about me!</p>
                    <BiEditAlt className="profile-header__icon"></BiEditAlt>
                </div>
                <Divider className="profile-header__divider"></Divider>
            </div>
        );
    }
}

export default ProfileHeader;