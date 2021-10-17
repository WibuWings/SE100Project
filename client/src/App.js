import React, { Component } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import DirectionURL from './Router/DirectionURL';
import './css/App.css'
import { connect } from 'react-redux'
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);

  }

  async componentWillMount() {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== "") {
      axios.post(`http://localhost:5000/refresh`, {
        token: localStorage.getItem('token'),
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token);
          const data = {
            email: res.data.data._id,
            firstName: res.data.data.firstName ? res.data.data.firstName : "",
            lastName: res.data.data.lastName ? res.data.data.lastName : "",
            old: res.data.data.old ? res.data.data.old : "",
            gender: res.data.data.gender ? res.data.data.gender : "0",
            storeName: res.data.data.storeName ? res.data.data.storeName : "",
            tel: res.data.data.phoneNumber ? res.data.data.phoneNumber : "",
            province: res.data.data.province ? res.data.data.province : "0",
            district: res.data.data.district ? res.data.data.district : "0",
            address: res.data.data.address ? res.data.data.address : "",
          }
          this.props.updateProfile(data);
          this.props.changeLoginStatus();
        }
      }).catch(err => {
        console.log("thất bại");
      })
    }
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
    updateProfile: (data) => {
      dispatch({
          type: "UPDATA_DATA_USER",
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          old: data.old,
          gender: data.gender,
          storeName: data.storeName,
          tel: data.tel,
          province: data.province,
          district: data.district,
          address: data.address,
      })
  }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

