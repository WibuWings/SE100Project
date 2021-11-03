import React, { Component } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import DirectionURL from './Router/DirectionURL';
import './css/App.css'
import { connect } from 'react-redux'
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { FiChevronRight, FiXSquare } from "react-icons/fi";

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

  autoHideAlert = () => {
    setTimeout(() => this.props.hideAlert(), 3000);
  }

  render() {
    return (
      <Router>
        <DirectionURL></DirectionURL>
        {this.props.alertReducer.status ? this.autoHideAlert() : null}
        {this.props.alertReducer.status ? <Alert onClick={() => this.props.hideAlert()} className="message-error" severity={this.props.alertReducer.typeMessage}>{this.props.alertReducer.message} — check it out! <FiXSquare></FiXSquare></Alert> : null}
      </Router>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLogin: state.loginStatus,
    alertReducer: state.alert,
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
    },
    hideAlert: () => {
      dispatch({
        type: "HIDE_ALERT",
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

