import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';

import { ComponentToPrint } from './ComponentToPrint';

class SellProduct extends Component {
    render() {
        return (
            <div>
                <ReactToPrint
                    trigger={() => {
                        return <a href="#">Print this out!</a>;
                    }}
                    content={() => this.componentRef}
                />
                <div style={{display:'none'}}>
                    <ComponentToPrint ref={el => (this.componentRef = el)} />
                </div>
            </div>
        );
    }
}

export default SellProduct;