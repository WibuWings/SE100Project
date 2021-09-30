import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Link,
    NavLink
} from "react-router-dom";


class Login extends Component {

    hash = () => {
        var bcrypt = require('bcryptjs');
        var pass = "lngthinphc"
        var hash = bcrypt.hashSync(pass, 12)
        var verified = bcrypt.compareSync("lngthinphc", hash);
        return hash + verified;
    }

    render() {
        return (
            <div>
                Hello đây là login
                <NavLink className="nav-link" to="/register">Register</NavLink>
                <h1 onClick={() => this.props.changeLoginStatus()}>Nhập để đổi trạng thái</h1>
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
            });
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);