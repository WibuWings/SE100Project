const StatusEditInfomationBillInitialState = false,
statusEditInfomationBill = (state = StatusEditInfomationBillInitialState, action) => {
    switch(action.type) {
        case "CHANGE_EDIT_INFOMATION_STATUS":
            return  !state; 
        default:
            return state
    }
}

export default statusEditInfomationBill;