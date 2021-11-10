const typeRecieptInitialState = [],
    typeRecieptReducer = (state = typeRecieptInitialState, action) => {
        switch (action.type) {
            case "ADD_NEW_TYPE_RECIEPT":
                return [...state, action.typeReciept];
            case "DELETE_TYPE_RECIEPT":
                return state.filter((value) => value !== action.typeReciept);
            default:
                return state
        }
    }

export default typeRecieptReducer;