
const currentEmployeeViewValueInitialState =
{
    id: ''
},

currentEmployeeViewValueReducer = (state = currentEmployeeViewValueInitialState, action) => {
    switch (action.type) {
        case "SET_ID_EMPLOYEE":
            return {
                id: action.id,
            }
        default:
            return state
    }
}

export default currentEmployeeViewValueReducer;