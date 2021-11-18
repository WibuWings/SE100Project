const StatusUpdateNextWeekTimeKeepingInitialState = false,
statusUpdateNextWeekTimeKeepingReducer = (state = StatusUpdateNextWeekTimeKeepingInitialState, action) => {
    switch(action.type) {
        case "CHANGE_UPDATE_NEXTWEEK_TIMEKEEPING_STATUS":
            return  !state; 
        default:
            return state
    }
}

export default statusUpdateNextWeekTimeKeepingReducer;