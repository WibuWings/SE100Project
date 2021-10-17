const RoleInitialState = "",
RoleReducer = (state = RoleInitialState, action) => {
    switch(action.type) {
        case "ADMIN_ROLE":
            return  "admin"; 
        case "EMPLOYEE_ROLE": 
            return "employee";   
        default:
            return "admin";
    }
}

export default RoleReducer;