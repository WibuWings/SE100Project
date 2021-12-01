const StatusAddGoodInitialState = false;
const statusAddGoodReducer = (state = StatusAddGoodInitialState, action) => {
    switch(action.type) {
        case "CHANGE_ADD_GOOD_STATUS":
            return !state;
        default:
            return state
    }
}

export default statusAddGoodReducer;