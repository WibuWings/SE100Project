const listRecieptInitialState = [],
    listRecieptReducer = (state = listRecieptInitialState, action) => {
        switch (action.type) {
            case "UPDATE_RECIEPT_USER":
                // action.listReciept.map(value => {
                //     let date = {
                //         MAHD: value._id.recieptID,
                //         name: value.employeeID.name,
                //         date: this.dateFunction(),
                //         discount: this.state.percentDiscount,
                //         totalMoney: this.totalFinalMoney(),
                //         totalFinalMoney: this.totalFinalMoney(),
                //         listProduct: this.props.shoppingBags,
                //         time: this.state.date.getHours() + ":" + this.state.date.getMinutes(),
                //         isEdit: false,
                //         oldBill: this.props.statusEditInfoBill ? this.props.InfomationBillEdit : null,
                //     }
                // })

                return state;
            case "ADD_RECIEPT":
                return [...state, action.newReciept]
            case "EDIT_SHOPPING_BAGS":
                return state.filter((value) => {
                    if (value.MAHD === action.MAHD) {
                        value.isEdit = true
                    }
                    return value;
                })
            case "DELETE_RECIEPT":
                return state.filter((value) => {
                    if (value.MAHD === action.MAHD) {
                        value.isDelete = true
                    }
                    return value;
                })
            default:
                return state
        }
    }

export default listRecieptReducer;