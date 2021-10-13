const statusModalConfirmPasswordInitialState = false,
statusModalConfirmPasswordReducer = (state = statusModalConfirmPasswordInitialState, action) => {
    switch(action.type) {
        case "CHANGE_MODAL_CONFIRM_PASSWORD_STATUS":
            return  !state; 
        default:
            return state
    }
}

export default statusModalConfirmPasswordReducer;