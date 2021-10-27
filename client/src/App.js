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
      })
        .then(res => {
          console.log("Thành công");
          console.log(res.data);
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token);
            this.props.updateProfile(res.data.data);
            this.props.updateAvatar(res.data.data.manager.imgUrl ? res.data.data.manager.imgUrl : "https://res.cloudinary.com/databaseimg/image/upload/v1634091995/sample.jpg");
            this.props.updateShiftTypes(res.data.data.shiftTypes)
            this.props.changeLoginStatus();
          }
        })
        .catch(err => {
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
        data: data,
      })
    },
    updateAvatar: (avatar) => {
      dispatch({
        type: "UPDATE_AVATAR",
        avatar: avatar,
      })
    },
    updateShiftTypes: (shiftTypes) => {
      dispatch({
        type: "UPDATE_DATA_SHIFT_USER",
        shiftTypes: shiftTypes,
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

