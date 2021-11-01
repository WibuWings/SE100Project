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
                return {
                    _id: {
                        productID: action._id.productID,
                        importDate: action._id.importDate,
                    },
                    name: action.name, 
                    imgUrl: action.imgUrl, 
                    quantity: action.quantity, 
                    remain: action.remain, 
                    unit: action.unit,
                    importPrice: action.importPrice, 
                    sellPrice: action.sellPrice, 
                    expires: action.expires, 
                }
            default:
                return state
        }
    }

export default infoGoodReducer;