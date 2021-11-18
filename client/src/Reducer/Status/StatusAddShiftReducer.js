const StatusAddShiftInitialState = false,
statusAddShiftReducer = (state = StatusAddShiftInitialState, action) => {
    switch(action.type) {
        case "CHANGE_ADD_STATUS":
            return  !state; 
        default:
            return state
    }
}

export default statusAddShiftReducer;