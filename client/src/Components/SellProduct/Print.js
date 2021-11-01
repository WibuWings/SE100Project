import React from 'react';
import ReactToPrint from 'react-to-print';
import { connect } from 'react-redux';
import ComponentToPrint from './ComponentToPrint';

class Printf extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      change: true,
    }
  }


  render() {
    console.log("Printf");
    return (
      <div onClick={() => {this.setState({change: !this.state.change})}}>
        <ReactToPrint
          trigger={() => {
            return <a href="#">Print Hóa đơn</a>;
          }}
          content={() => this.componentRef}
        />
        <ComponentToPrint shoppingBags={this.props.shoppingBags} ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    infoUser: state.infoUser,
    shoppingBags: state.shoppingBags,
  }
}


export default connect(mapStateToProps)(Printf)