const InfomationBillEditInitialState = {},
    InfomationBillEditReducer = (state = InfomationBillEditInitialState, action) => {
        switch (action.type) {
            case "ADD_INFO_BILL_EDIT":
                return  action.InfoBill
            default:
                return state
        }
    }

export default InfomationBillEditReducer;