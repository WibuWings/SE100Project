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
import { connect } from 'react-redux'

class DashboardURL extends Component {
    render() {
        return ( 
            <div>  
                 {this.props.role? (<Route exact path="/dashboard" component={DashBoard}></Route>): null}   
                 {this.props.role? (<Route exact path="/goodmanager/import" component={GoodImport}></Route> ): null}   
                 {this.props.role? (<Route exact path="/goodmanager" component={GoodManager}></Route>): null}   
                 {this.props.role? (<Route exact path="/employeemanager" component={EmployeeManager}></Route> ): null}   
                 {this.props.role? (  <Route exact path="/receiptmanager" component={ReceiptManager}></Route>  ): null}   
                <Route exact path="/profile" component={Profile}></Route>
                <Route exact path="/sellproduct" component={SellProduct}></Route>
                {this.props.role? (<Route path="/" component={DashBoard}></Route> ): (<Route path="/" component={SellProduct}></Route> )}   
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        role: state.role,
    }
}

export default connect(mapStateToProps)(DashboardURL);