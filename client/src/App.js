import React, { Component } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import DirectionURL from './Router/DirectionURL';
import './CSS/App.css'
import { connect } from 'react-redux'
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);

  }

  async componentWillMount() {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('token') !== "") {
        this.props.changeLoginStatus()
      }
    } else {
      localStorage.setItem('token', '')
    }

    axios.get(`https://provinces.open-api.vn/api/?depth=2`)
      .then(res => {
        console.log(res.data);
        this.props.updateProvince(res.data);
      })
      .catch(err => {
        console.log("fail");
      })
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

