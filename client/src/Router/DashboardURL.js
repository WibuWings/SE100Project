import React, { Component } from 'react';
import {
    Route,
} from "react-router-dom";
import GoodManager from '../Components/GoodManager';
import GoodImport from '../Components/GoodPartials/GoodImport';
import EmployeeManager from '../Components/EmployeeManager';
import DashBoard from '../Components/Dashboard/DashBoard';
import Profile from '../Components/Profile/Profile';
import ReceiptManager from '../Components/ReiceiptManager';
import SellProduct from '../Components/SellProduct/SellProduct';

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
                <Route exact path="/sellproduct" component={SellProduct}></Route>      
            </div>
        );
    }
}


export default DashboardURL;