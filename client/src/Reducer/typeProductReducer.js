
const typeProductInitialState = [
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
                return action.data;
            case "ADD_TYPE":
                return [...state, action.data];
            case "UPDATE_TYPE":
            {
                var newState = [];
                for(var i = 0 ; i < state.length ; i ++)
                {
                    if(state[i]._id.typeID != action.data._id.typeID)
                    {
                        newState.push(state[i]);
                    }
                    else 
                    {
                        newState.push(action.data);
                    }
                }
                return newState;
            }
            case "DELETE_TYPE":
            {
                console.log("action.data", action.data);
                var newState = [];
                for(var i = 0 ; i < state.length ; i ++)
                {
                    if(state[i]._id.typeID != action.data.typeID)
                    {
                        newState.push(state[i]);
                    }
                    else 
                    {
                        console.log("Xoá được ở vị trí thứ" ,i);
                    }
                }
                console.log("newState", newState)
                return newState;
            }

            default:
                return state
        }
    }

export default typeProductReducer;