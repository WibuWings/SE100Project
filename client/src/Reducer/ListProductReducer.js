
const listProductInitialState = [
    {
        _id: {
            productID: "", 
            importDate: "", 
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
        typeIDList: [],
    },
],

    listProductReducer = (state = listProductInitialState, action) => {
        switch (action.type) {
            case "GET_PRODUCT_AND_TYPE":
                return{
                    state: action.data
                }
            default:
                return state
        }
    }

export default listProductReducer;