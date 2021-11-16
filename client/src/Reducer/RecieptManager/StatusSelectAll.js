const StatusSelectAllInitialState = false,
statusSelectAllReducer = (state = StatusSelectAllInitialState, action) => {
    switch(action.type) {
        case "CHANGE_SELECT_ALL_STATUS":
            return  !state; 
        case "RESET_STATUS_SELECT_ALL":
            return false;
        default:
            return state
    }
}

export default statusSelectAllReducer;