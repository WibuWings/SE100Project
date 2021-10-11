import React, { Component } from 'react';
import avatarImg from '../../img/avatar_default.jpg'
import Divider from '@mui/material/Divider';
import { FaTelegramPlane } from "react-icons/fa";
import { connect } from 'react-redux'
import AvatarEditor  from 'react-avatar-editor'

class ProfileHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageURL: null,
        }
    }
    

    setEditorRef = (editor) => (this.editor = editor)

    profileImageChange = (fileChangeEvent) => {
        const file = fileChangeEvent.target.files[0];
        const { type } = file;
        if (!(type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg') || type.endsWith('gif'))) {
        } else {
            this.props.updateAvatar(fileChangeEvent.target.files[0]);
        }

        if (this.editor) {
            const canvas = this.editor.getImage().toDataURL();
            // this.props.updateAvatar(canvas);
            fetch(canvas)
                .then(res => res.blob())
                .then(blob => {
                    console.log( window.URL.createObjectURL(blob));
                    this.setState({
                        imageURL: window.URL.createObjectURL(blob),
                    })
                });
        }
    }

    render() {
        return (
            <div className="profile-header" style={{ width: '100%', height: '350px' }}>
                {/* <label for="profile-header-update-avatar">
                    <img
                        src={this.state.imageURL ? this.state.imageURL : avatarImg}
                        style={{ height: '150px', width: '150px' }}
                    />
                </label> */}
                <label for="profile-header-update-avatar" style={{ borderRadius: '100%', overflow: 'hidden', marginTop: '15px ' }}>
                    <AvatarEditor
                        className="profile-header__avt"
                        ref={this.setEditorRef}
                        image={this.props.infoUser.avatar ? this.props.infoUser.avatar : avatarImg}
                        width={100}
                        height={100}
                        border={5}
                        color={[153, 153, 153, 0.9]}
                        scale={1}
                        borderRadius={60}
                    />
                </label>
                {/* Ẩn đi */}
                <input id="profile-header-update-avatar" type="file" style={{ display: 'none' }} accept="image/png, image/jpeg" onChange={(e) => this.profileImageChange(e)}></input>
                <div className="profile-header-des">
                    <h2 className="profile-header__name">
                        {this.props.infoUser.lastName + " " + this.props.infoUser.firstName}
                    </h2>
                </div>
                <div style={{ display: 'flex', fontSize: '1rem', color: "white" }}>
                    <FaTelegramPlane className="profile-header__icon-tel"></FaTelegramPlane>
                    <p className="profile-header__tel">{this.props.infoUser.tel}</p>
                </div>
                <Divider className="profile-header__divider"></Divider>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        infoUser: state.infoUser,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateAvatar: (avatar) => {
            dispatch({
                type: "UPDATE_AVATAR",
                avatar: avatar
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);