const typeProductValueInitialState = {
    _id: {
        typeID: "",
        storeID: "",
    },
    name: "",
},

    typeProductValueReducer = (state = typeProductValueInitialState, action) => {
        switch (action.type) {

            case "UPDATE_PRODUCT_TYPE":
                return {
                    ...state, 
                    _id: {
                        typeID: action._id.typeID,
                        storeID: action._id.storeID,
                    },
                    name: action.name 
                }
            default:
                return state
        }
    }

export default typeProductValueReducer;