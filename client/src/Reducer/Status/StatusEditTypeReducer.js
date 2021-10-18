const StatusEditTypeInitialState = false,
statusEditTypeReducer = (state = StatusEditTypeInitialState, action) => {
    switch(action.type) {
        case "CHANGE_EDIT_TYPE_STATUS":
            return  !state; 
        default:
            return state
    }
}

export default statusEditTypeReducer;