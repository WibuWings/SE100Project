const StatusAddTypeInitialState = false,
statusAddTypeReducer = (state = StatusAddTypeInitialState, action) => {
    switch(action.type) {
        case "CHANGE_ADD_TYPE_STATUS":
            return  !state; 
        default:
            return state
    }
}

export default statusAddTypeReducer;