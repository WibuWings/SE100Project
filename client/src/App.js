import React, { Component } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import DirectionURL from './Router/DirectionURL';
import './CSS/App.css'
import { connect } from 'react-redux'


class App extends Component {
  constructor(props) {
    super(props);

  }

  async componentWillMount() {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('token') !== "") {
        this.props.changeLoginStatus()
      }
    }
    this.props.updateDataUser('Đây là mẫu test',"tinh_vinh_long");
  }

  render() {
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
    },
    updateProvince: (data) => {
      dispatch({
        type: "UPDATE_DATA",
        data: data,
      })
    },
    updateDataUser: (test, tinh) => {
      dispatch({
        type: "UPDATA_DATA_USER",
        test: test,
        province: tinh
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

