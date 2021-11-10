const StatusShowHistoryRecieptInitialState = false,
statusShowHistoryReciept = (state = StatusShowHistoryRecieptInitialState, action) => {
    switch(action.type) {
        case "CHANGE_HISTORY_RECIEPT_STATUS":
            return  !state; 
        default:
            return state
    }
}

export default statusShowHistoryReciept;