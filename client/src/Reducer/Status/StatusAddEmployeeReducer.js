const StatusAddEmployeeInitialState = false,
statusAddEmployeeReducer = (state = StatusAddEmployeeInitialState, action) => {
    switch(action.type) {
        case "CHANGE_ADD_EMPLOYEE_STATUS":
            return  !state; 
        default:
            return state
    }
}

export default statusAddEmployeeReducer;