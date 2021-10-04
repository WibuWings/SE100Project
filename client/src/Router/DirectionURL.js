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

export default connect(mapStateToProps)(DirectionURL);