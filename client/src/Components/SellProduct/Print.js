import React from 'react';
import ReactToPrint from 'react-to-print';
import { connect } from 'react-redux';
import ComponentToPrint from './ComponentToPrint';
import axios from 'axios';


class Printf extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      percentDiscount: 0,
      infoReciept: [],
      code: '',
      date: new Date(),
      MAHD: "HD" + this.makeCode(6),
      moneyReduce: 0,
      coupon: null,
    }
  }


  totalMoney = () => {
    let total = 0;
    this.props.shoppingBags.map(value => {
      total += value.quantity * value.product.sellPrice;
    })
    return total;
  }

  reduceMoney = () => {
    let total = 0;
    this.props.shoppingBags.map(value => {
      total += value.quantity * value.product.sellPrice;
    })
    if (total !== 0) {
      total = total * this.state.percentDiscount / 100
      return total;
    }
    return total;
  }

  totalFinalMoney = () => {
    let total = 0;
    this.props.shoppingBags.map(value => {
      total += value.quantity * value.product.sellPrice;
    })
    if (total !== 0) {
      total -= total * this.state.percentDiscount / 100
      return total;
    }
    return total;
  }

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

  getProductByID() {

  }

  addReciept = async () => {
    if (this.props.shoppingBags.length === 0) {
      this.props.hideAlert()
      this.props.showAlert("Cart empty ", "warning")
    } else {
      let code = this.makeCode(8);
      var isContinue = true;
      this.setState({
        code: code
      })
      const data = {
        MAHD: code,
        idUser: this.props.infoUser.employeeID ? this.props.infoUser.employeeID : this.props.infoUser._id,
        name: this.props.infoUser.lastName + " " + this.props.infoUser.firstName,
        date: this.dateFunction(),
        discount: this.state.percentDiscount,
        totalMoney: this.totalMoney(),
        totalFinalMoney: this.totalFinalMoney(),
        listProduct: this.props.shoppingBags,
        time: this.state.date.getHours() + ":" + this.state.date.getMinutes(),
        isEdit: false,
        oldBill: this.props.statusEditInfoBill ? this.props.InfomationBillEdit : null,
        coupon: this.state.coupon
      }
      await axios.post('http://localhost:5000/api/sell-product/add-reciept', {
        email: this.props.infoUser.managerID ? this.props.infoUser.managerID : this.props.infoUser.email,
        token: localStorage.getItem('token'),
        data: data,
      })
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token)
            if (this.props.statusEditInfoBill) {
              axios.post('http://localhost:5000/api/sell-product/edit-reciept', {
                MAHD: this.props.InfomationBillEdit.MAHD,
                token: localStorage.getItem('token'),
                email: this.props.infoUser.email,
              })
                .then(res => {
                  this.props.changeStatusEditRecipt()
                  this.props.editShoppingBar(this.props.InfomationBillEdit.MAHD)
                })
                .catch(err => {
                  this.props.changeLoginStatus();
                  this.props.hideAlert();
                  this.props.showAlert("Login timeout, signin again", "warning");
                })

            }

            if (this.state.coupon) {
              this.props.updateQuantityCoupon(this.state.coupon.idCoupon)
            }

            this.setState({
              infoReciept: this.props.shoppingBags,
            })
            this.props.hideAlert()
            this.props.showAlert("Print bill success", "success")
            this.props.addRecieptToHistory(data);
            this.setState({
              coupon: null,
            })
          }
        })
        .catch(err => {
          this.props.changeLoginStatus();
          this.props.hideAlert();
          this.props.showAlert("Login timeout, signin again", "warning");
          isContinue = false;
        })
      if (isContinue) {
        console.log("Chạy thành công rồi")
        // Update số lượng sản phẩm ở đây
        console.log("this.props.shoppingBags", this.props.shoppingBags)
        for (var i = 0; i < this.props.shoppingBags.length; i++) {
          const data = {
            token: localStorage.getItem('token'),
            product: {
              _id:
              {
                productID: this.props.shoppingBags[i].product._id.productID,
                importDate: this.props.shoppingBags[i].product._id.importDate,
                storeID: this.props.shoppingBags[i].product._id.storeID,
              },
              remain: this.props.shoppingBags[i].product.remain - this.props.shoppingBags[i].quantity,
            }
          }
          axios.put(`http://localhost:5000/api/product`, data)
            .then(res => {
              console.log("Update success", i);
              // Xử lý ở redux
              const dataRedux = data.product;
              this.props.decreaseRemainProduct(dataRedux);
            })
            .catch(err => {
              console.log(err);
            })
        }


        this.props.resetShoppingBag();
      }



    }
  }

  CancelEditReiept = () => {
    this.props.changeStatusEditRecipt()
    this.props.resetShoppingBag()
  }

  dateFunction = () => {
    let month = this.state.date.getMonth() + 1;
    return "  " + this.state.date.getDate() + " / " + month + " / " + this.state.date.getFullYear()
  }

  componentWillReceiveProps(nextProps) {
    let now = new Date()
    let money = this.totalMoney();
    let percent = 0;
    let reduceMoney = 0;
    this.props.listCoupon.map(value => {
      let start = new Date(value.timeFrom)
      let end = new Date(value.timeEnd)
      if (value.quantity > 0) {
        if (now - start >= 0 && end - now >= 0) {
          if (money >= Number(value.minTotal)) {
            let index = money * Number(value.percent) / 100;
            if (index >= reduceMoney) {
              percent = Number(value.percent);
              reduceMoney = index;
              this.setState({
                coupon: value,
              })
            }
          }
        }
      }
    })
    this.setState({
      percentDiscount: Number(percent)
    })
  }


  componentWillMount() {
    console.log(this.props.listCoupon)
    let now = new Date()
    let money = this.totalMoney();
    let percent = 0;
    let reduceMoney = 0;
    this.props.listCoupon.map(value => {
      let start = new Date(value.timeFrom)
      let end = new Date(value.timeEnd)
      if (value.quantity > 0) {
        if (now - start >= 0 && end - now >= 0) {
          if (money >= Number(value.minTotal)) {
            let index = money * Number(value.percent) / 100;
            if (index >= reduceMoney) {
              percent = Number(value.percent);
              reduceMoney = index;
              this.setState({
                coupon: value,
              })
            }
          }
        }
      }
    })
    this.setState({
      percentDiscount: Number(percent)
    })
  }

  render() {
    const PrintBill = this.addReciept
    document.onkeydown = function (e) {
      switch (e.key.charCodeAt()) {
        case 70:
          PrintBill()
          break;
        default:
          break;
      }
    }
    return (
      <div>
        <div style={{ margin: '0px' }} className="row">
          <div className="col-10 offset-1">
            <div className="row">
              <div style={{ fontSize: '1.2rem' }} className="col-7">
                <p style={{}}>Total</p>
              </div>
              <div className="col-5">
                <p style={{ textAlign: 'end', marginBottom: '0', fontSize: '1.2rem' }}>{this.totalMoney().toLocaleString()}</p>
              </div>
              <div style={{ fontSize: '1.2rem' }} className="col-7">
                <p>Discount (%)</p>
              </div>
              <div style={{ marginBottom: '10px' }} className="col-5">
                <input disabled value={this.state.percentDiscount} style={{ fontSize: '1.2rem', border: 'none', outline: 'none', textAlign: 'end', width: '100%', borderBottom: '1px solid black' }} min={0} max={100} type="number"></input>
              </div>
              <div style={{ fontSize: '1.2rem' }} className="col-7">
                <p style={{}}>Reduce</p>
              </div>
              <div className="col-5">
                <p style={{ textAlign: 'end', marginBottom: '0', fontSize: '1.2rem' }}>-{this.reduceMoney().toLocaleString()}</p>
              </div>
              <div className="col-7">
                <p style={{ margin: '0', fontSize: '1.2rem', fontWeight: '700' }}>TOTAL FINAL</p>
              </div>
              <div className="col-5">
                <p style={{ margin: '0', fontSize: '1.2rem', textAlign: 'end', color: 'green', fontWeight: '700' }}>{this.totalFinalMoney().toLocaleString()}</p>
              </div>
            </div>
          </div>
          {this.props.statusEditInfoBill ? (
            <div className="col-12">
              <div className="row">
                <div onClick={() => this.addReciept()} style={{ cursor: 'pointer' }} className="col-8">
                  <ReactToPrint
                    trigger={() => {

                      return <div style={{ marginTop: '10px', borderRadius: '4px', fontWeight: '600', backgroundColor: '#37c737', textAlign: 'center', alignContent: 'center', padding: '15px 0', fontSize: '1.4rem' }}>
                        SAVE (F9)
                      </div>;
                    }}
                    content={this.props.shoppingBags.length !== 0 ? () => this.componentRef : null}
                  />
                </div>
                <div className="col-4">
                  <div onClick={() => this.CancelEditReiept()} style={{ width: '100%', marginTop: '10px', borderRadius: '4px', fontWeight: '600', backgroundColor: '#757575', textAlign: 'center', alignContent: 'center', padding: '15px 0', fontSize: '1.4rem', cursor: 'pointer' }} className="col-4">
                    CANCEL
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div onClick={() => this.addReciept()} style={{ cursor: 'pointer' }} className="col-12">
              <ReactToPrint
                trigger={() => {

                  return <div style={{ marginTop: '10px', borderRadius: '4px', fontWeight: '600', backgroundColor: '#37c737', textAlign: 'center', alignContent: 'center', padding: '15px 0', fontSize: '1.4rem' }}>
                    PAY (F9)
                  </div>;
                }}
                content={this.props.shoppingBags.length !== 0 ? () => this.componentRef : null}
              />
            </div>
          )}
          <div className="col-12">
            <p onClick={() => this.props.changeStatusHistoryReciept()} style={{ cursor: 'pointer' }}>(*) Receipt history</p>
          </div>
        </div>
        {/* Ẩn đi */}
        <div style={{ display: 'none' }}>
          <ComponentToPrint MAHD={this.state.code} percentDiscount={this.state.percentDiscount} infoUser={this.props.infoUser} shoppingBags={this.props.shoppingBags} ref={el => (this.componentRef = el)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    infoUser: state.infoUser,
    shoppingBags: state.shoppingBags,
    statusEditInfoBill: state.statusEditInfoBill,
    InfomationBillEdit: state.InfomationBillEdit,
<<<<<<< HEAD
    listCoupon: state.listCoupon
=======
    listCoupon: state.listCoupon,
    InfomationBillEdit: state.InfomationBillEdit,
>>>>>>> origin/front-end-phuoc-dashboard
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeStatusHistoryReciept: () => {
      dispatch({
        type: "CHANGE_HISTORY_RECIEPT_STATUS",
      });
    },
    addRecieptToHistory: (data) => {
      dispatch({
        type: "ADD_RECIEPT",
        newReciept: data,
      });
    },
    showAlert: (message, typeMessage) => {
      dispatch({
        type: "SHOW_ALERT",
        message: message,
        typeMessage: typeMessage,
      })
    },
    hideAlert: () => {
      dispatch({
        type: "HIDE_ALERT",
      })
    },
    resetShoppingBag: () => {
      dispatch({
        type: "RESET_SHOPPING_BAGS"
      })
    },
    changeStatusEditRecipt: () => {
      dispatch({
        type: "CHANGE_EDIT_INFOMATION_STATUS"
      })
    },
    changeLoginStatus: () => {
      dispatch({
        type: "CHANGE_LOGIN_STATUS",
      });
    },
    editShoppingBar: (MAHD) => {
      dispatch({
        type: "EDIT_SHOPPING_BAGS",
        MAHD: MAHD,
      })
<<<<<<< HEAD
    }
=======
    },
    updateQuantityCoupon: (idCoupon) => {
      dispatch({
        type: "UPDATE_QUANTITY_COUPON",
        idCoupon: idCoupon,
      })
    },
    decreaseRemainProduct: (data) => {
      dispatch({
        type: "DECREASE_REMAIN_PRODUCT",
        data: data,
      });
    },
>>>>>>> origin/front-end-phuoc-dashboard
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Printf)