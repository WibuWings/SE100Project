const loginStatusInitialState = true,
loginStatusReducer = (state = loginStatusInitialState, action) => {
    switch(action.type) {
        case "CHANGE_LOGIN_STATUS":
            return  !state; 
            break;

        default:
            return state
            break;
    }
}

export default loginStatusReducer;