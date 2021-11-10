const typeByDateInitialState = {
    
},
    typeByDateReducer = (state = typeByDateInitialState, action) => {
        switch (action.type) {
            case "TYPE_BY_DATE":
                return action.typeByDate;
            default:
                return state
        }
    }

export default typeByDateReducer;