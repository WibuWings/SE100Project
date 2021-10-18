
const chooseTypeProductInitialState = 'all',
chooseTypeProductReducer = (state = chooseTypeProductInitialState, action) => {
        switch (action.type) {
            case "UPDATE_TYPE_CHOOSE":
                return action.typeProduct;
            default:
                return state;
        }
    }

export default chooseTypeProductReducer;