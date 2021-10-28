
const typeProductInitialState = [
    {
        type: "rau",
        name: "Rau"
    },
    {
        type: "trai_cay",
        name: "Trái cây"
    }, 
],

    typeProductReducer = (state = typeProductInitialState, action) => {
        switch (action.type) {
            case "GET_PRODUCT_TYPE":
                return {
                    state: action.data
                }
            default:
                return state
        }
    }

export default typeProductReducer;