const StatusEditShiftInitialState = false,
statusAddShiftReducer = (state = StatusEditShiftInitialState, action) => {
    switch(action.type) {
        case "CHANGE_EDIT_SHIFT_STATUS":
            return  !state; 
        default:
            return state
    }
}

export default statusAddShiftReducer;