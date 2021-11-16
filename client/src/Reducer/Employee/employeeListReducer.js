const listEmployeeInitialState = {
    employees: [
        // {
        //     _id: { 
        //         employeeID: '3', 
        //         storeID: '19522006@gm.uit.edu.vn' 
        //     },
        //     managerID: '19522006@gm.uit.edu.vn',
        //     password: '1212',
        //     firstName: '1212',
        //     lastName: '1212',
        //     phoneNumber: '1212',
        //     dateOfBirth: "2021-11-20T00:00:00.000Z",
        //     email: '12121',
        //     address: '1212',
        //     cardID: '1212',
        //     startDate: "2021-11-26T00:00:00.000Z",
        //     deleted: false,
        //     __v: 0
        // },
    ]
}

const  listEmployeeReducer = (state = listEmployeeInitialState, action) => {
        switch (action.type) {
            case "GET_EMPLOYEE":
                state.employees = action.employees;
                return state;
            case "ADD_EMPLOYEE":
                return {
                    employees : [...state.employees, action.employees ]
                }
            case "UPDATE_EMPLOYEE":
                {
                    var newState = [];
                    for(var i = 0 ; i < state.employees.length ; i ++)
                    {
                        if(i != action.index)
                        {
                            newState.push(state.employees[i]);
                        }
                        else 
                        {
                            newState.push(action.data);
                        }
                    }
                    console.log("newState", newState);
                    return {
                        employees : newState
                    }

                }
                case "DELETE_EMPLOYEE":
                {
                    console.log("action", action);
                    var newState = [];
                    for(var i = 0 ; i < state.employees.length ; i ++)
                    {
                        if(state.employees[i]._id.employeeID !== action.id)
                        {
                            newState.push(state.employees[i]);
                        }
                        else {
                            console.log("Kiếm đc cái xoá rồi")
                        }
                    }
                    return {
                        employees : newState
                    }

                }
            default:
                return state
        }
    }

export default listEmployeeReducer;