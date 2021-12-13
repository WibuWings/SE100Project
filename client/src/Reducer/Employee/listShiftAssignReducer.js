const listShiftAssignInitialState =[];

const listShiftAssignReducer = (state = listShiftAssignInitialState, action) => {
        switch (action.type) {
            case "SET_SHIFT_ASSIGN":
            {
                return action.data;
            }
                
            case "ADD_NEW_SHIFT_ASSIGN":
                {
                    console.log("action.data", action.data);
                    console.log("current State", state);
                    var newState = [];
                    for(var i =0 ; i< state.length; i++)
                    {
                        newState.push(state[i]);
                    }
                    newState.push(action.data);
                    console.log("newState", newState);
                    return newState;  
                }
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