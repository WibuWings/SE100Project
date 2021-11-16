const StatusUpdateTimeKeepingInitialState = false,
statusUpdateTimeKeepingReducer = (state = StatusUpdateTimeKeepingInitialState, action) => {
    switch(action.type) {
        case "CHANGE_UPDATE_TIMEKEEPING_STATUS":
            return  !state; 
        default:
            return state
    }
}

export default statusUpdateTimeKeepingReducer;