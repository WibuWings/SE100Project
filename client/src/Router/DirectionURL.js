import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Body from '../Components/Body';
import Login from '../Components/Login';
import Register from '../Components/Register';
import { connect } from 'react-redux';


class DirectionURL extends Component {
    

    notLogin = () => {
        return (
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/">
                    <Login />
                </Route>
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

    render() {
        return (
            <div>
                {this.props.isLogin ? this.Login() : this.notLogin()}
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


export default connect(mapStateToProps, mapDispatchToProps)(DirectionURL);