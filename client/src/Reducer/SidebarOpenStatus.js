const sidebarOpenInitialState = true,
sidebarOpenReducer = (state = sidebarOpenInitialState, action) => {
    switch(action.type) {
        case "OPEN_SIDEBAR":
            return  true; 
        case "CLOSE_SIDEBAR": 
            return false;   
        default:
            return state;
    }
}

export default sidebarOpenReducer;