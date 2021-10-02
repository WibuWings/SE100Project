import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from "react-router-dom";
import Home from '../Components/Home';
import GoodManager from '../Components/GoodManager';
import EmployeeManager from '../Components/EmployeeManager';
import DashBoard from '../Components/DashBoard';
import Profile from '../Components/Profile';
import ReceiptManager from '../Components/ReiceiptManager';

class DashboardURL extends Component {
    render() {
        return (
            <div>      
                {/* <Route  path="/:slug" component={Home}></Route> */}
                {/* <Route  path="/home" component={Home}></Route> */}
                <Route exact path="/" component={DashBoard}></Route>
                {/* <Route exact path="/login" component={Login}></Route> */}
                <Route exact path="/dashboard" component={DashBoard}></Route>
                <Route exact path="/goodmanager" component={GoodManager}></Route>
                <Route exact path="/employeemanager" component={EmployeeManager}></Route>
                <Route exact path="/receiptmanager" component={ReceiptManager}></Route> 
                <Route exact path="/profile" component={Profile}></Route>      
                {/* <DashBoard /> */}
            </div>
        );
    }
}


export default DashboardURL;