
const regulationInitialState =
{
    
},

regulationReducer = (state = regulationInitialState, action) => {
    switch (action.type) {
        case "SET_REGULATION":
            return action.data;
        case "UPDATE_REGULATION":
            return action.data;
        default:
            return state
    }
}

export default regulationReducer;