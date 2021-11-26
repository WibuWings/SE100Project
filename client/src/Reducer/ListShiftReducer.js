
const listShiftInitialState = [],
    listShiftReducer = (state = listShiftInitialState, action) => {
        switch (action.type) {
            case "DELETE_SHIFT":
                return state.filter((value, key) => (value._id.shiftID !== action.idShift));
            case "ADD_SHIFT":
                return [...state, action.newShift]
            case "OBJECT_UPDATE_SHIFT":
                state.forEach(item => {
                    if(item._id.shiftID === action.data.id) {
                        item.name = action.data.description;
                        item.salary = action.data.salary;
                        item.timeFrom = action.data.from;
                        item.timeEnd = action.data.to;
                    }
                })
                return state
            case "UPDATE_DATA_SHIFT_USER":
                if (action.shiftTypes.length !== 0){
                    state = action.shiftTypes
                }
                return state
            case "RESET_SHIFT_USER":
                return []
            default:
                return state
        }
    }

export default listShiftReducer;