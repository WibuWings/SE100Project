const shoppingBagsInitialState = [],
    shoppingBagsReducer = (state = shoppingBagsInitialState, action) => {
        switch (action.type) {
            case "ADD_NEW_PRODUCT_SHOPPING_BAGS": 
                return [...state, action.newProduct];
            case "RAISE_QUANTITY_SHOPPING_BAGS":
                return state.map(value => {
                    if (value.product.name === action.name) {
                        value.quantity += 1;
                    }
                    return value
                })
            case "REDUCE_QUANTITY_SHOPPING_BAGS":
                return state.map(value => {
                    if (value.product.name === action.name) {
                        value.quantity -= 1;
                    }
                    return value
                })
            case "DELETE_PRODUCT_SHOPPING_BAGS":
                return state.filter((value) => {
                    if (value.product.name !== action.name) {
                        return value
                    }
                })
            case "RESET_SHOPPING_BAGS":
                return state = [];
            case "INFO_SHOPPING_BAGS_EDIT":
                return action.listProduct
            default:
                return state
        }
    }

export default shoppingBagsReducer;