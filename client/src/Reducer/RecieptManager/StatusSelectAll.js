const StatusSelectAllInitialState = false,
statusSelectAllReducer = (state = StatusSelectAllInitialState, action) => {
    switch(action.type) {
        case "CHANGE_SELECT_ALL_STATUS":
            return  !state; 
        default:
            return state
    }
}

export default statusSelectAllReducer;