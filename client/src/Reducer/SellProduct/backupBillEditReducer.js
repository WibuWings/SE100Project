const backupBillEditInitialState = {},
    backupBillEditReducer = (state = backupBillEditInitialState, action) => {
        switch (action.type) {
            case "BACKUP_BILL_EDIT":
                {
                    console.log("action.InfoBill", action.InfoBill)
                    return  action.InfoBill
                } 
            default:
                return state
        }
    }

export default backupBillEditReducer;