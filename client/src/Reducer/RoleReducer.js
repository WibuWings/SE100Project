const RoleInitialState = false,
roleReducer = (state = RoleInitialState, action) => {
    switch(action.type) {
        case "ADMIN_ROLE":
            return  true; 
        case "EMPLOYEE_ROLE": 
            return false;   
        default:
            return state;
    }
}

export default roleReducer;