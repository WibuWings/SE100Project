const infoGoodInititial = {
    _id: {
        productID: "",
        importDate: Date.now(),
        storeID: "",
    },
    name: "", 
    imgUrl: "", 
    quantity: "", 
    remain: "", 
    unit: "",
    importPrice: "", 
    sellPrice: "", 
    expires: "", 
},

    infoGoodReducer = (state = infoGoodInititial, action) => {
        switch (action.type) {
            case "UPDATE_GOOD_DATA":
                return action.data;
            default:
                return state
        }
    }

export default infoGoodReducer;