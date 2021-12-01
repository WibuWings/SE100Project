const StatusUpdateTypeInitialState = false;
const statusUpdateTypeReducer = (state = StatusUpdateTypeInitialState, action) => {
    switch(action.type) {
        case "CHANGE_UPDATE_TYPE_STATUS":
            return !state;
        default:
            return state
    }
}

export default statusUpdateTypeReducer;