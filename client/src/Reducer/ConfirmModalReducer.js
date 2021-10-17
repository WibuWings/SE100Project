const ConfirmModalInitialState = "",
confirmModalReducer = (state = ConfirmModalInitialState, action) => {
    switch(action.type) {
        case "SET_CONFIRM_IMPORT_GOOD":
            return  "confirm-import-good"; 
        case "SET_CONFIRM_DELETE_GOOD":
            return "confirm-delete-good";
        case "SET_CONFIRM_UPDATE_GOOD":
            return "confirm-update-good";
        default:
            return state;
    }
}

export default confirmModalReducer;