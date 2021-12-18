
const chooseTypeProductInitialState = 'all',
chooseTypeProductReducer = (state = chooseTypeProductInitialState, action) => {
        switch (action.type) {
            case "UPDATE_TYPE_CHOOSE":
                return action.typeProductID;
            default:
                return state;
        }
    }

export default chooseTypeProductReducer;