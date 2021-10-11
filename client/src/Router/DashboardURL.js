import React, { Component } from 'react';
import {
    Route,
} from "react-router-dom";
import GoodManager from '../Components/GoodManager';
import GoodImport from '../Components/GoodPartials/GoodImport';
import EmployeeManager from '../Components/EmployeeManager';
import DashBoard from '../Components/DashBoard';
import Profile from '../Components/Profile';
import ReceiptManager from '../Components/ReiceiptManager';

class DashboardURL extends Component {
    render() {
        return (
            <div>      
                <Route exact path="/" component={DashBoard}></Route>
                <Route exact path="/dashboard" component={DashBoard}></Route>
                <Route path="/goodmanager/import" component={GoodImport}></Route>
                <Route exact path="/goodmanager" component={GoodManager}></Route>
                <Route exact path="/employeemanager" component={EmployeeManager}></Route>
                <Route exact path="/receiptmanager" component={ReceiptManager}></Route> 
                <Route exact path="/profile" component={Profile}></Route>      
            </div>
        );
    }
}


export default DashboardURL;