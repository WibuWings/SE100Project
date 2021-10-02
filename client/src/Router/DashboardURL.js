import React, { Component } from 'react';
import {
    Route,
} from "react-router-dom";
import Home from '../Components/Home';
import Setting from '../Components/Setting';
import Setting1 from '../Components/Setting1';


class DashboardURL extends Component {
    render() {
        return (
            <div>      
                    <Route  path="/home" component={Home}></Route>
                    <Route exact path="/test1" component={Setting}></Route>
                    <Route exact path="/test2" component={Setting1}></Route>
            </div>
        );
    }
}


export default DashboardURL;