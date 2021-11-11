const listShiftAssignInitialState =
    
[
    {
        _id: {
            dateInWeek: 'T7',
            storeID: '19522006@gm.uit.edu.vn',
            shiftType: {
                _id: {
                    shiftID: 'v908tB',
                    storeID: '19522006@gm.uit.edu.vn',
                },
            },
            employee: {
                _id: {
                    employeeID: '1',
                    storeID: '19522006@gm.uit.edu.vn',
                },
            },
        },
        createdAt: '2021-01-02',
    }
    
];

const listShiftAssignReducer = (state = listShiftAssignInitialState, action) => {
        switch (action.type) {
            // case "SET_NEXT_WEEK_TIMEKEEPER":
            //     return{
            //         state: action.data
            //     }
            case "ADD_NEW_SHIFT_ASSIGN":
                return [...state, action.data]
            // case "UPDATE_NEXT_WEEK_TIMEKEEPER":
            //     state[action.index] = action.data;
            //     return state;
            case "DELETE_SHIFT_ASSIGN":
                {
                    console.log("Đã vô được delete");
                    console.log(action.data);
                    var newState = [];
                    for(var i = 0 ; i < state.length ; i ++)
                    {
                        if(state[i]._id.dateInWeek !== action.data._id.dateInWeek 
                            || state[i]._id.shiftType._id.shiftID !== action.data._id.shiftType._id.shiftID 
                            || state[i]._id.employee._id.employeeID !== action.data._id.employee._id.employeeID)
                        {
                            newState.push(state[i]);
                        }
                    }
                    return newState;

                    // return state.filter((value, key) => 
                    //     (
                    //         value._id.dateInWeek !== action.data._id.dateInWeek 
                    //         || value._id.shiftType._id.shiftID !== action.data._id.shiftType._id.shiftID 
                    //         || value._id.employee._id.employeeID !== action.data._id.employee._id.employeeID 
                    //     )
                    // );
                }
               
                
            default:
                return state
        }
    }

export default listShiftAssignReducer;