const StatusDarkmodeInitialState = false,
statusDarkmodeReducer = (state = StatusDarkmodeInitialState, action) => {
    switch(action.type) {
        case "CHANGE_DARKMODE":
            return  !state; 
        default:
            return state;
    }
}

export default statusDarkmodeReducer;