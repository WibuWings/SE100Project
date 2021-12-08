import React from 'react';

class ComponentToPrintReceiptCoupon extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        }
    }



    render() {
        return (
            <div className="row">
                Thích gì thì code ra receipt coupon
            </div>
        );
    }
}

export default ComponentToPrintReceiptCoupon;