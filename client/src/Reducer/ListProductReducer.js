
const listProductInitialState = [
    {
        name: "Rau củ cải",
        type: "rau",
        sellPrice: "30 000 VNĐ"
    },
    {
        name: "Chôm Chôm",
        type: "trai_cay",
        sellPrice: "50 000 VNĐ"
    }, 
    {
        name: "Sầu riêng",
        type: "trai_cay",
        sellPrice: "80 000 VNĐ"
    },
    {
        name: "Rau củ cải",
        type: "rau",
        sellPrice: "30 000 VNĐ"
    },
    {
        name: "Chôm Chôm",
        type: "trai_cay",
        sellPrice: "50 000 VNĐ"
    }, 
    {
        name: "Sầu riêng",
        type: "trai_cay",
        sellPrice: "80 000 VNĐ"
    },
    {
        name: "Rau củ cải",
        type: "rau",
        sellPrice: "30 000 VNĐ"
    },
    {
        name: "Chôm Chôm",
        type: "trai_cay",
        sellPrice: "50 000 VNĐ"
    }, 
    {
        name: "Sầu riêng",
        type: "trai_cay",
        sellPrice: "80 000 VNĐ"
    },
    {
        name: "Rau củ cải",
        type: "rau",
        sellPrice: "30 000 VNĐ"
    },
    {
        name: "Chôm Chôm",
        type: "trai_cay",
        sellPrice: "50 000 VNĐ"
    }, 
    {
        name: "Sầu riêng",
        type: "trai_cay",
        sellPrice: "80 000 VNĐ"
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