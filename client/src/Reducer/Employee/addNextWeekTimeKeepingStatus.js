const StatusAddNextWeekTimeKeepingInitialState = false,
statusAddNextWeekTimeKeepingReducer = (state = StatusAddNextWeekTimeKeepingInitialState, action) => {
    switch(action.type) {
        case "CHANGE_ADD_NEXTWEEK_TIMEKEEPING_STATUS":
            return  !state; 
        default:
            return state
    }
}

export default statusAddNextWeekTimeKeepingReducer;