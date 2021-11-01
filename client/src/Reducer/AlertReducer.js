
const alertInitialState = {
    status: false,
    message: "",
    typeMessage: "",
},
alertReducer = (state = alertInitialState, action) => {
    switch(action.type) {
        case "SHOW_ALERT":
            state = {
                status: true,
                message: action.message,
                typeMessage: action.typeMessage,
            }
            return  state; 
        case "HIDE_ALERT":
            state = {
                status: false,
                message: "",
                typeMessage: "",
            }
            return state;
        default:
            return state
    }
}

export default alertReducer;