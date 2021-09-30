import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Body from '../Components/Body';
import Login from '../Components/Login';
import Register from '../Components/Register';
import ForgotPassword from '../Components/ForgotPassword';
import { connect } from 'react-redux';


class DirectionURL extends Component {


    notLogin = () => {
        return (
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/forgot" component={ForgotPassword}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/" component={Login}></Route>
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
                {!this.props.isLogin ? this.notLogin() : this.Login()}
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