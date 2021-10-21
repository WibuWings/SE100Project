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
            email: res.data.data.manager._id,
            firstName: res.data.data.manager.firstName ? res.data.data.manager.firstName : "",
            lastName: res.data.data.manager.lastName ? res.data.data.manager.lastName : "",
            old: res.data.data.manager.old ? res.data.data.manager.old : "",
            gender: res.data.data.manager.gender ? res.data.data.manager.gender : "0",
            storeName: res.data.data.manager.storeName ? res.data.data.manager.storeName : "",
            tel: res.data.data.manager.phoneNumber ? res.data.data.manager.phoneNumber : "",
            province: res.data.data.manager.province ? res.data.data.manager.province : "0",
            district: res.data.data.manager.district ? res.data.data.manager.district : "0",
            address: res.data.data.manager.address ? res.data.data.manager.address : "",
          }
          this.props.updateProfile(data);
          if (res.data.data.manager.imgUrl){
            this.props.updateAvatar(res.data.data.manager.imgUrl)
          }
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
    },
    updateAvatar: (avatar) => {
      dispatch({
        type: "UPDATE_AVATAR",
        avatar: avatar,
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

