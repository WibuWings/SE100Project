import React, { Component } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import DirectionURL from './Router/DirectionURL';
import './CSS/App.css'
import { connect } from 'react-redux'


class App extends Component {
  render() {
    window.onload = () => {
      if (localStorage.getItem('token')) {
        if (localStorage.getItem('token') !== "") {
          this.props.changeLoginStatus()
        }
      } else {
        localStorage.setItem('token', '')
      }
    }
    return (
      <Router>
        <DirectionURL></DirectionURL>
      </Router>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

