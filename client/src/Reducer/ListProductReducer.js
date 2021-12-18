
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
                return {
                    state: action.data
                }
            case "ADD_PRODUCT":
                return {
                    state: [...state.state, action.data]
                }
            case "UPDATE_PRODUCT":
                var newState = [];
                for(var i = 0 ; i < state.state.length; i++)
                {
                    if(state.state[i]._id.productID != action.data._id.productID)
                    {
                        newState.push(state.state[i]);
                    }
                    else 
                    {
                        newState.push(action.data);
                    }
                }
                return {
                    state: newState
                }
            case "DELETE_PRODUCT":
                var newState = [];
                for(var i = 0 ; i < state.state.length; i++)
                {
                    if(state.state[i]._id.productID != action.data._id.productID)
                    {
                        newState.push(state.state[i]);
                    }
                    else 
                    {
                        
                    }
                }
                return {
                    state: newState
                }
            case "DECREASE_REMAIN_PRODUCT": 
            {
                var newState = [];
                for(var i = 0 ; i < state.state.length; i++)
                {
                    if(state.state[i]._id.productID != action.data._id.productID)
                    {
                        newState.push(state.state[i]);
                    }
                    else 
                    {
                        var decreaseVal = state.state[i];
                        decreaseVal.remain = action.data.remain;
                        newState.push(decreaseVal);
                    }
                }
                console.log("newState", newState)
                return {
                    state: newState
                }
            }
            case "DELETE_TYPE_PRODUCT": 
            {
                var newState = [];
                for(var i = 0 ; i < state.state.length; i++)
                {
                    state.state[i].typeIDList = state.state[i].typeIDList.filter(function(item) {
                        return item !== action.typeID;
                    })
                    newState.push(state.state[i]);
                }
                return {
                    state: newState
                }
            }
            default:
                return state
        }
    }

export default listProductReducer;