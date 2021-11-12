const listRecieptInitialState = [],
    listRecieptReducer = (state = listRecieptInitialState, action) => {
        switch (action.type) {
            case "UPDATE_RECIEPT_USER":
                action.listReciept.map(value => {
                    let data = {
                        MAHD: value._id.receiptID,
                        name: value.employeeID.name,
                        date: value.createAt,
                        discount: value.discount,
                        totalMoney: value.totalMoney,
                        totalFinalMoney: value.totalFinalMoney,
                        listProduct: value.listItem,
                        time: value.timeCreate,
                        isEdit: value.isEdit,
                        oldBill: value.oldBill,
                        isDelete: value.isDelete? value.isDelete : false,
                    }
                    state.push(data)
                })
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
            case "DELETE_ONE_RECIEPT":
                return state.filter((value) => {
                    if (value.MAHD !== action.MAHD) {
                        return value
                    }
                })
            case "DELETE_MAHD_SELECTED_RECIEPT":
                return state.filter(value => {
                    let isCheck = false
                    action.listMAHD.map(value1 => {
                        console.log(value.MAHD)
                        console.log(value1)
                        if (value.MAHD == value1) {
                            isCheck = true;
                        }
                    })
                    if (!isCheck) return value
                })
            case "DELETE_MAHD_INVOICE_RECIEPT":
                return state.filter(value => {
                    return !value.isDelete
                })
            case "DELETE_ALL_RECIEPT":
                return []
            default:
                return state
        }
    }

export default listRecieptReducer;