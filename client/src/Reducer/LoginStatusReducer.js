const loginStatusInitialState = false,
loginStatusReducer = (state = loginStatusInitialState, action) => {
    switch(action.type) {
        case "CHANGE_LOGIN_STATUS":
            return  !state; 

        default:
            return state
    }
}

export default loginStatusReducer;