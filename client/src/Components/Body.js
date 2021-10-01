import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,    
    NavLink
} from "react-router-dom";
import DashboardURL from '../Router/DashboardURL';
import {connect} from 'react-redux';

class Body extends Component {
    render() {
        return (
            <div>
                {/*                 
                <Link to="/home">Home</Link>
                <Link to="/dashboard">DashBoard</Link>
                <Link to="/test1">test1</Link>
                <Link to="/test2">test2</Link> */}
                <DashboardURL></DashboardURL>
                <NavLink to="/login" onClick={() => this.props.changeLoginStatus()}>Đăng xuất</NavLink>
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