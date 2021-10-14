const StatusDeleteConfirmInitialState = false,
statusDeleteConfirmReducer = (state = StatusDeleteConfirmInitialState, action) => {
    switch(action.type) {
        case "SET_DELETE_STATUS":
            return  true; 
        case "UNSET_DELETE_STATUS": 
            return false;   
        default:
            return false;
    }
}

export default statusDeleteConfirmReducer;