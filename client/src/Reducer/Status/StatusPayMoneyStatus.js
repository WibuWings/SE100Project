const StatusPayEmployeeInitialState = false,
statusPayEmployeeReducer = (state = StatusPayEmployeeInitialState, action) => {
    switch(action.type) {
        case "CHANGE_PAY_EMPLOYEE_STATUS":
            return  !state; 
        default:
            return state
    }
}

export default statusPayEmployeeReducer;