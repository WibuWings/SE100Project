import React, { Component } from 'react';
import {
    NavLink
} from "react-router-dom";
import DashboardURL from '../Router/DashboardURL';
import {connect} from 'react-redux';
import SideNavBar from './Partials/SideNavBar';

class Body extends Component {
    render() {
        return (
            <div>
                <SideNavBar/>
                <div style={{width: 'calc(100% - 224px)',/* textAlign: 'center',*/ 
                position: 'fixed', top: 0, right: 0
                }}>
                    <DashboardURL></DashboardURL>
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
export default connect(mapStateToProps, mapDispatchToProps)(Body);