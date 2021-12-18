const StatusUpdateEmployeeInitialState = false,
statusUpdateEmployeeReducer = (state = StatusUpdateEmployeeInitialState, action) => {
    switch(action.type) {
        case "CHANGE_UPDATE_EMPLOYEE_STATUS":
            return  !state; 
        default:
            return state
    }
}

export default statusUpdateEmployeeReducer;