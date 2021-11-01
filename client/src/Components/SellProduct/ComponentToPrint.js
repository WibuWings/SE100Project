import { connect } from "react-redux";
import React from 'react';



class ComponentToPrint extends React.PureComponent {
    constructor(props) {
        super(props);

    }



    render() {
        
        return (
            <div>
                <h1>In bill</h1>
                <table>
                    <thead>
                        <th>#</th>
                        <th>Name</th>
                        <th>Số lượng</th>
                        <th>Thành Tiền</th>
                    </thead>
                    <tbody>
                        {this.props.shoppingBags ? this.props.shoppingBags.map((value, key) => (
                            <tr>
                                <td>{key + 1}</td>
                                <td>{value.product.name}</td>
                                <td>{value.quantity}</td>
                                <td>{value.quantity * value.product.sellPrice}</td>
                            </tr>
                        ))
                            : 'Không có gì'}
                    </tbody>
                </table>
            </div>
        );
    }
}



export default ComponentToPrint;