
const shoppingBagsInitialState = [],
    shoppingBagsReducer = (state = shoppingBagsInitialState, action) => {
        switch (action.type) {
            case "ADD_PRODUCT_SHOPPING_BAGS":

                var isCheck = false;
                state.map(value => {
                    if (value.product.name === action.product.name) {
                        value.quantity += 1;
                        console.log("if ");
                        isCheck = true;
                    }
                })
                if (!isCheck) {
                    const newProduct = {
                        product: action.product,
                        quantity: 1,
                    }
                    console.log("else ");
                    state.push(newProduct)
                }
                return state;
            case "RAISE_QUANTITY_SHOPPING_BAGS":
                state.map(value => {
                    if (value.product.name === action.name) {
                        value.quantity += 1;
                    }
                })
                return state;
            case "REDUCE_QUANTITY_SHOPPING_BAGS":
                state.map(value => {
                    if (value.product.name === action.name) {
                        value.quantity -= 1;
                    }
                })
                return state;
            case "DELETE_PRODUCT_SHOPPING_BAGS":
                return state.filter(value => {
                    if (value.product.name !== action.name) {
                        return value
                    }
                })
            default:
                return state
        }
    }

export default shoppingBagsReducer;