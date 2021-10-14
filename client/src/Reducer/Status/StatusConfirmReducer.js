const StatusConfirmInitialState = false,
statusConfirmReducer = (state = StatusConfirmInitialState, action) => {
    switch(action.type) {
        case "CHANGE_CONFIRM_STATUS":
            return  !state; 
        default:
            return state
    }
}

export default statusConfirmReducer;