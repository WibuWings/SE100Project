
const typeProductInitialState = [
    {
        _id: {
            typeID: "",
            storeID: "",
        },
        name: "",
    },
    {
        _id: {
            typeID: "",
            storeID: "",
        },
        name: "",
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