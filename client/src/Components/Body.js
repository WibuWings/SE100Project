import React, { Component } from 'react';
import {
    NavLink
} from "react-router-dom";
import DashboardURL from '../Router/DashboardURL';
import { connect } from 'react-redux';
import SideNavBar from './Partials/SideNavBar';
import Alert from '@mui/material/Alert';
import { FiChevronRight, FiXSquare } from "react-icons/fi";
import '../css/Body.css'
import ModalConfirmPassword from './ModalConfirmPassword';

class Body extends Component {
    render() {
        return (
            <div>
                <SideNavBar />
                <div 
                    className="body-content"
                    style={{
                        width: 'calc(100% - 224px)',
                        position: 'fixed', top: 0, right: 0, backgroundColor: this.props.statusDarkmode ? 'rgb(221,235,255)' : 'rgba(20,20,20,0.4)', borderLeft: '2px solid #99999975',
                    }}
                >
                    <DashboardURL></DashboardURL>
                </div>
                {this.props.statusConfirmPassword ?
                    <div className="modal-comfirm-password">
                        <ModalConfirmPassword></ModalConfirmPassword>
                    </div> : null
                }
                 {/* <Alert onClick={} className="message-error" severity="success">Hello — check it out! <FiXSquare></FiXSquare></Alert> */}
                {/* {this.state.statusFailed ? <Alert onClick={() => this.OutAlert()} className="message-error" severity="error">{this.message} — check it out! <FiXSquare></FiXSquare></Alert> : null} */}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLogin: state.loginStatus,
        statusDarkmode: state.statusDarkmode,
        statusConfirmPassword: state.statusConfirmPassword,
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

export default connect(mapStateToProps, mapDispatchToProps)(Body);