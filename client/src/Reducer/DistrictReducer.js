const districtInitialState = [],
    districtReducer = (state = districtInitialState, action) => {
        switch (action.type) {
            case "GET_DATA":
                return state;
            case "UPDATE_DATA_DISTRICT":
                return action.data;
            default:
                return state
        }
    }

export default districtReducer;