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
import ForgotPassword from '../Components/ForgotPassword';


class DirectionURL extends Component {
    

    notLogin = () => {
        return (
            <div>
                <Route path="/login" component={Login}></Route>
                <Route path="/forgot" component={ForgotPassword}></Route>
                <Route path="/register" component={Register}></Route>
                {/* <Route path="/" component={Login}></Route> */}
                <Route path="/" component={Body}></Route>
            </div>
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
                <Route path="/login" component={Login}></Route>
                <Route path="/forgot" component={ForgotPassword}></Route>
                <Route path="/register" component={Register}></Route>
                {/* <Route path="/" component={Login}></Route> */}
                <Route path="/" component={Body}></Route>
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