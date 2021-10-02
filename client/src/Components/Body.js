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
                {/*                 
                <Link to="/home">Home</Link>
                <Link to="/dashboard">DashBoard</Link>
                <Link to="/test1">test1</Link>
                <Link to="/test2">test2</Link> */}
                <SideNavBar/>
                <div style={{ width: '100%', display: 'flex', border: '1px solid #333',  
                justifyContent: 'center', alignItems: 'center'}}>
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