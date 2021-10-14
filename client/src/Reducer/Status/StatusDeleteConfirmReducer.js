const StatusDeleteConfirmInitialState = false,
statusDeleteConfirmReducer = (state = StatusDeleteConfirmInitialState, action) => {
    switch(action.type) {
        case "CHANGE_DELETE_STATUS":
            return  !state; 
        default:
            return state
    }
}

export default statusDeleteConfirmReducer;