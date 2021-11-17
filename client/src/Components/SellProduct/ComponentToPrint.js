import React from 'react';



class ComponentToPrint extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        }
    }

    minute = 1000 * 60;
    hour = this.minute * 60;
    day = this.hour * 24;
    year = this.day * 365;

    makeCode = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    totalMoney = () => {
        let total = 0;
        this.props.shoppingBags.map(value => {
            total += value.quantity * value.product.sellPrice;
        })
        return total.toLocaleString();
    }

    reduceTotalMoney = () => {
        let total = 0;
        this.props.shoppingBags.map(value => {
            total += value.quantity * value.product.sellPrice;
        })
        if (total !== 0) {
            total = total*this.props.percentDiscount/100
        }
        return total.toLocaleString()
    }

    finalTotalMoney = () => {
        let total = 0;
        this.props.shoppingBags.map(value => {
            total += value.quantity * value.product.sellPrice;
        })
        if (total !== 0 && this.props.percentDiscount !== 0) {
            total -= total*this.props.percentDiscount/100
        }
        return total.toLocaleString();
    }

    dateFunction = () => {
        let month = this.state.date.getMonth()+1;
        return "  " + this.state.date.getDate() + " / " + month + " / " + this.state.date.getFullYear()
    }

    render() {
        
        return (
            <div className="row">
                {this.reduceTotalMoney()}
                <div className="col-12">
                    <h1 style={{ textAlign: 'center' }}>{this.props.infoUser.storeName}</h1>
                </div>
                <div style={{ borderBottom: '1px solid #00000059' }} className="col-12">
                    <p style={{ textAlign: 'center', marginBottom: '0' }}>{this.props.infoUser.address}</p>
                    <p style={{ textAlign: 'center' }}>{this.props.infoUser.district + ' ' + this.props.infoUser.province}</p>
                    <p style={{ textAlign: 'center' }}>{"SĐT: " + this.props.infoUser.tel}</p>
                </div>
                <div style={{ marginTop: '30px' }} className="col-12">
                    <h4 style={{ textAlign: 'center' }}>HÓA ĐƠN THANH TOÁN</h4>
                </div>
                <div className="col-12">
                    <p style={{ textAlign: 'center', fontWeight: '400' }}>Số HĐ: {this.props.MAHD}</p>
                    <div style={{ margin: '0 5px' }} className="row">
                        <div className="col-6">
                            <p style={{ fontWeight: '700' }}>Date:
                                <span style={{ fontWeight: '400' }}>
                                    {this.dateFunction()}
                                </span>
                            </p>
                        </div>
                        <div className="col-6">
                            <p style={{ fontWeight: '700' }}>Time:
                                <span style={{ fontWeight: '400' }}>
                                    {"  " + this.state.date.getHours() + ":" + this.state.date.getMinutes()}
                                </span>
                            </p>
                        </div>
                    </div>
                    <p style={{ fontWeight: '700', margin: '0 17px' }}>
                        Cashier:
                        <span style={{ fontWeight: '400' }}>
                            {"  Admin"}
                        </span>
                    </p>
                </div>
                <table style={{ margin: '0 10px' }} class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Total money</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.shoppingBags ? this.props.shoppingBags.map((value, key) => (
                            <tr>
                                <td>{key + 1}</td>
                                <td>{value.product.name}</td>
                                <td>{value.quantity}</td>
                                <td>{value.product.sellPrice}</td>
                                <td>{value.quantity * value.product.sellPrice}</td>
                            </tr>
                        ))
                        : null}
                    </tbody>
                </table>
                <div style={{marginTop: '20px'}} className="col-12">
                    <div className="row">
                        <div className="col-6">
                            <h6 style={{ textAlign: 'end' }}>Total :</h6>
                        </div>
                        <div className="col-6">
                            <h6 style={{ textAlign: 'start' }}>{this.totalMoney()}đ</h6>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-6">
                            <h6 style={{ textAlign: 'end' }}>Discount :</h6>
                        </div>
                        <div className="col-6">
                            <h6 style={{ textAlign: 'start' }}>-{this.reduceTotalMoney()}đ</h6>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-6">
                            <h5 style={{ textAlign: 'end' }}>TOTAL FINAL :</h5>
                        </div>
                        <div className="col-6">
                            <h5 style={{ textAlign: 'start' }}>{this.finalTotalMoney()}đ</h5>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '30px' }} className="col-12">
                    <h6 style={{ textAlign: 'center',fontStyle: 'italic ' }}>Xin cảm ơn quý khách</h6>
                    <h6 style={{ textAlign: 'center',fontStyle: 'italic ' }}>hẹn gặp lại!</h6>
                </div>
            </div>
        );
    }
}

export default ComponentToPrint;