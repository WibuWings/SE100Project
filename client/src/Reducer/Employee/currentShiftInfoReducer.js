
const currentShiftValueInitialState =
{
    _id: {
        dateInWeek: "",
        storeID: "",
        shiftType: {
            _id: {
                shiftID: "",
                storeID: "",
            },
        },
      }
},

currentShiftValueReducer = (state = currentShiftValueInitialState, action) => {
    switch (action.type) {
        case "SET_CURRENT_SHIFT_VALUE":
            return action.data;
        default:
            return state
    }
}

export default currentShiftValueReducer;