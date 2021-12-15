const listRecieptInitialState = [],
    listRecieptReducer = (state = listRecieptInitialState, action) => {
        switch (action.type) {
            case "UPDATE_RECIEPT_USER":
                action.listReciept.map(value => {
                    let data = {
                        MAHD: value._id.receiptID,
                        name: value.employeeID.name,
                        idUser: value.employeeID._id.employeeID ? value.employeeID._id.employeeID : '',
                        date: value.createAt,
                        discount: value.discount,
                        totalMoney: value.totalMoney,
                        totalFinalMoney: value.totalFinalMoney,
                        listProduct: value.listItem,
                        time: value.timeCreate,
                        isEdit: value.isEdit,
                        oldBill: value.oldBill,
                        deleted: value.deleted ? value.deleted : false,
                        coupon: value.coupon ? value.coupon : null
                    }
                    state.push(data)
                })
                return state;
            case "ADD_RECIEPT":
                return [...state, action.newReciept]
            case "EDIT_SHOPPING_BAGS":
                // console.log("action.oldBill",action.oldBill );
                var newState = [];
                for(var i = 0; i < state.length ; i++)
                {
                    if (state[i].MAHD === action.oldBill.MAHD) {
                        // console.log("Tìm được cái để thay thế rồi")
                        state[i] = Object.assign({},{...action.oldBill});
                        state[i].isEdit = true
                        // console.log("Giá trị sau khi sửa", state[i]);
                        newState.push(state[i]);
                    }
                    else {
                        newState.push(state[i]);
                    }
                }
                return newState;
            case "DELETE_RECIEPT":
                return state.filter((value) => {
                    if (value.MAHD === action.MAHD) {
                        value.deleted = true
                    }
                    return value;
                })
            case "DELETE_ONE_RECIEPT":
                return state.filter((value) => {
                    if (value.MAHD !== action.MAHD) {
                        return value
                    }
                })
            case "DELETE_MAHD_SELECTED_RECIEPT":
                return state.filter(value => {
                    action.listMAHD.map(value1 => {
                        if (value.MAHD === value1) {
                            value.deleted = true
                        }
                    })
                    return value
                })
            case "DELETE_MAHD_INVOICE_RECIEPT":
                return state.filter(value => {
                    return !value.deleted
                })
            case "RESTONE_ONE_RECIEPT":
                return state.filter(value => {
                    if (value.MAHD === action.MAHD) {
                        value.deleted = false;
                    }
                    return value
                })
            case "RESTONE_ALL_RECIEPT":
                return state.filter(value => {
                    value.deleted = false;
                    return value
                })
            case "DELETE_ALL_RECIEPT":
                return state.filter(value => {
                    value.deleted = true
                    return value;
                })
            case "RESET_ALL_RECIEPT_USER":
                return [];
            default:
                return state
        }
    }

export default listRecieptReducer;