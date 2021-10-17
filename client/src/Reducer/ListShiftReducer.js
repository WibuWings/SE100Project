
const listShiftInitialState = [
    {
        description: "Ca 1",
        from: "0:36 PM",
        id: "V8GOL1",
        to: "3:36 PM",
        salary: 20000,
    },
    {
        description: "Ca 2",
        from: "0:36 PM",
        id: "V8GOc1",
        to: "3:36 PM",
        salary: 20000,
    },
    {
        description: "Ca 3",
        from: "0:36 PM",
        id: "V8sOL1",
        to: "3:36 PM",
        salary: 20000,
    },
    {
        description: "Ca 4",
        from: "0:36 PM",
        id: "V8cOL1",
        to: "3:36 PM",
        salary: 20000,
    }
],

    listShiftReducer = (state = listShiftInitialState, action) => {
        switch (action.type) {
            case "DELETE_SHIFT":
                return state.filter((value, key) => (value.id.toString() !== action.idShift));
            case "ADD_SHIFT":
                return [...state, action.newShift]
            case "OBJECT_UPDATE_SHIFT":
                state.forEach(item => {
                    if(item.id === action.data.id) {
                        item.description = action.data.description;
                        item.salary = action.data.salary;
                        item.from = action.data.from;
                        item.to = action.data.to;
                    }
                })
                return state
            default:
                return state
        }
    }

export default listShiftReducer;