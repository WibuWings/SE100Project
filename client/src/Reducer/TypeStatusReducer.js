const typeUserInitialState = "manager",
typeUserReducer = (state = typeUserInitialState, action) => {
    switch(action.type) {
        case "TYPE_USER":
            return  action.typeUser; 
        case "GET_TYPE_USER":
            return state;
        default:
            return state;
    }
}

export default typeUserReducer;