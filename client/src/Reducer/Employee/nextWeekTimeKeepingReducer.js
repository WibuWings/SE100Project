const nextWeekTimeKeepingInitialState =
    
[
    {
        _id: {
            dateInWeek: "T6",
            storeID: "19522006@gm.uit.edu.vn",
            shiftType: {
                _id: {
                    shiftID: "1",
                    storeID: "19522006@gm.uit.edu.vn",
                },
            },
            employee: {
                _id: {
                    employeeID: "2",
                    storeID: "19522006@gm.uit.edu.vn",
                },
            },
        },
        alternativeEmployee: {
            _id: {
                employeeID: "3",
                storeID: "19522006@gm.uit.edu.vn",
            },
        },
        realDate: "2021-12-04",
    }
];

const nextWeekTimeKeepingReducer = (state = nextWeekTimeKeepingInitialState, action) => {
        switch (action.type) {
            case "SET_NEXT_WEEK_TIMEKEEPER":
                return{
                    state: action.data
                }
            case "ADD_NEW_NEXT_WEEK_TIMEKEEPER":
                return [...state, action.data]
            default:
                return state
        }
    }

export default nextWeekTimeKeepingReducer;