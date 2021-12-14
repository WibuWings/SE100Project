const StatusAddEmployeeToShiftInitialState = false,
statusAddEmployeeToShiftReducer = (state = StatusAddEmployeeToShiftInitialState, action) => {
    switch(action.type) {
        case "CHANGE_ADD_EMPLOYEE_TO_SHIFT_STATUS":
            return  !state; 
        default:
            return state
    }
}

export default statusAddEmployeeToShiftReducer;