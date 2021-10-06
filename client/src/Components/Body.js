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
            <div style={{display: 'flex'}}>
                <SideNavBar/>
                <div className="dashboard" style={{ width: '100%', display: 'flex', borderLeft: '2px solid #99999975',  
                backgroundColor: 'rgb(221,235,255)'}}>
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