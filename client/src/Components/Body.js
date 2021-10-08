import React, { Component } from 'react';
import {
    NavLink
} from "react-router-dom";
import DashboardURL from '../Router/DashboardURL';
import {connect} from 'react-redux';
import SideNavBar from './Partials/SideNavBar';

class Body extends Component {
    render() {
        return (
            <div>
                <SideNavBar/>
                <div style={{width: 'calc(100% - 224px)',
                position: 'fixed', top: 0, right: 0, backgroundColor: 'rgb(221,235,255)', borderLeft: '2px solid #99999975',
                }}>
                    <DashboardURL></DashboardURL>
                </div>
                {/* <div style={{marginLeft: '224px', width: '500px', backgroundColor: 'rgb(221,235,255)',
                 borderLeft: '2px solid #99999975',
                }}>
                    <DashboardURL></DashboardURL>
                </div> */}
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
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body);