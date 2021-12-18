const StatusAddTimeKeepingInitialState = false,
statusAddTimeKeepingReducer = (state = StatusAddTimeKeepingInitialState, action) => {
    switch(action.type) {
        case "CHANGE_ADD_TIMEKEEPING_STATUS":
            return  !state; 
        default:
            return state
    }
}

export default statusAddTimeKeepingReducer;