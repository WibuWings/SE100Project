import React, { Component } from 'react';
import SideNavBar from './Partials/SideNavBar';
class DashBoard extends Component {
    render() {
        return (
            
            <div style={{display: 'flex'}}>
                <SideNavBar/>
                <div id="content-wrapper" class="d-flex flex-column" 
                style={{ width: '100%', display: 'flex', border: '1px solid #333',  
                justifyContent: 'center', alignItems: 'center'}}>
                    DashBoard
                </div>
            </div>
            
        );
    }
}

export default DashBoard;