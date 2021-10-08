const infoUserInitialState = {},
loginStatusReducer = (state = infoUserInitialState, action) => {
    switch(action.type) {
        case "UPDATA_DATA":
            return  [...state,action.user]
        default:
            return state
    }
}

export default loginStatusReducer;