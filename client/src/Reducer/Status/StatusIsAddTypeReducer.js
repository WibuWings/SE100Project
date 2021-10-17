const StatusIsAddTypeInitialState = false,
statusIsAddTypeReducer = (state = StatusIsAddTypeInitialState, action) => {
    switch(action.type) {
        case "SET_ADD_TYPE_STATUS":
            return  true;
        case "SET_EDIT_TYPE_STATUS":
            return false;
        default:
            return false;
    }
}

export default statusIsAddTypeReducer;