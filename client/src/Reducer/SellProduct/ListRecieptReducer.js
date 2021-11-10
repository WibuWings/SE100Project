const listRecieptInitialState = [],
    listRecieptReducer = (state = listRecieptInitialState, action) => {
        switch (action.type) {
            case "UPDATE_RECIEPT_USER":
                return;
            case "ADD_RECIEPT":
                return [...state, action.newReciept]
            case "EDIT_SHOPPING_BAGS":
                return state.filter((value) => {
                    if (value.MAHD === action.MAHD) {
                        value.isEdit = true
                    }
                    return value;
                })
            case "DELETE_RECIEPT":
                return state.filter((value) => {
                    if (value.MAHD === action.MAHD) {
                        value.isDelete = true
                    }
                    return value;
                })
            default:
                return state
        }
    }

export default listRecieptReducer;