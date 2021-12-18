const statusYesConfirmInitialState = false,
statusYesConfirmReducer = (state = statusYesConfirmInitialState, action) => {
    switch(action.type) {
        case "CONFIRM":
            return  true; 
        case "QUIT":
            return  false; 
        default:
            return state
    }
}

export default statusYesConfirmReducer;