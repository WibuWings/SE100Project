import React, { Component } from 'react';
import SideNavBar from './Partials/SideNavBar';
class DashBoard extends Component {
    render() {
        return (
            <div>
                <SideNavBar/>
                <div id="content-wrapper" class="d-flex flex-column"></div>
            </div>
            
        );
    }
}

export default DashBoard;