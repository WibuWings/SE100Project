const listTimeKeepingInitialState =   
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
        realDate: '2021-11-11',
        isPaidSalary: false,
        createdAt: '2021-01-02',
    }
    
];

const listTimeKeepingReducer = (state = listTimeKeepingInitialState, action) => {
        switch (action.type) {
            // case "SET_NEXT_WEEK_TIMEKEEPER":
            //     return{
            //         state: action.data
            //     }
            case "ADD_NEW_TIME_KEEPER":
                return [...state, action.data]
            case "UPDATE_TIMEKEEPER":
                {
                    var newState = [];
                    for(var i = 0 ; i < state.length ; i ++)
                    {
                        if(i != action.index)
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
            case "DELETE_TIME_KEEPER":
                {
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

export default listTimeKeepingReducer;