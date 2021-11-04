const listRecieptInitialState = [],
    listRecieptReducer = (state = listRecieptInitialState, action) => {
        switch (action.type) {
            case "UPDATE_RECIEPT_USER":
               return;
            case "ADD_RECIEPT":
                return [...state, action.newReciept]
            default:
                return state
        }
    }

export default listRecieptReducer;