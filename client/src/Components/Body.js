import React, { Component } from 'react';

import DashboardURL from '../Router/DashboardURL';
import { connect } from 'react-redux';
import SideNavBar from './Partials/SideNavBar';
import '../css/Body.css'

class Body extends Component {
    render() {
        return (
            <div>
                <SideNavBar />
                <div 
                    className="body-content"
                    style={{
                        width: this.props.sidebarOpen ? 'calc(100% - 224px)' : 'calc(100% - 60px)' ,
                        position: 'fixed', top: 0, right: 0, backgroundColor: !this.props.statusDarkmode ?  '#e3f2fd' : '#263238', borderLeft: '2px solid #99999975',
                    }}
                >
                    <DashboardURL ></DashboardURL>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLogin: state.loginStatus,
        statusDarkmode: state.statusDarkmode,
        statusConfirmPassword: state.statusConfirmPassword,
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body);