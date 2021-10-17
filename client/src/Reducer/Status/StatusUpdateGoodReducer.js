const StatusUpdateGoodInitialState = false,
statusUpdateGoodReducer = (state = StatusUpdateGoodInitialState, action) => {
    switch(action.type) {
        case "CHANGE_UPDATE_GOOD_STATUS":
            return  !state; 
        default:
            return state
    }
}

export default statusUpdateGoodReducer;