import React, { Component } from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import Body from '../Components/Body';
import Login from '../Components/Login/Login';
import Register from '../Components/Login/Register';
import ForgotPassword from '../Components/Login/ForgotPassword';
import { connect } from 'react-redux';
import LoginWithEmployee from '../Components/Login/LoginWithEmployee';


class DirectionURL extends Component {
    notLogin = () => {
        return (
            <Switch>
                <Route path="/employee" component={LoginWithEmployee}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/forgot" component={ForgotPassword}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/" component={Login}></Route>
            </Switch>
        )
    }

    CashierScreen = () => {
        return (
            <Switch>
                <Route path="/employee" component></Route>
                <Route path="/" component></Route>
            </Switch>
        )
    }

    Login = () => {
        return (
            <Switch>
                <Route path="/">
                    <Body />
                </Route>
            </Switch>
        )
    }

    RenderScreen = () => {
        
    }

    render() {
        let render;
        if (!this.props.isLogin) {
            render = this.notLogin()
        } else if (this.props.typeUser.toString() === "manager") {
            render = this.Login()
        } else {
            render = this.CashierScreen()
        }
        return (
            <div>
                {this.Login()}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLogin: state.loginStatus,
        typeUser: state.typeUser,
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

export default connect(mapStateToProps, mapDispatchToProps)(DirectionURL);