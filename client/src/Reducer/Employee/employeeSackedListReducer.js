const listSackedEmployeeInitialState = {
    employees: [
        {
            _id: { 
                employeeID: '3', 
                storeID: '19522006@gm.uit.edu.vn' 
            },
            managerID: '19522006@gm.uit.edu.vn',
            password: '1212',
            firstName: '1212',
            lastName: '1212',
            phoneNumber: '1212',
            dateOfBirth: "2021-11-20T00:00:00.000Z",
            email: '12121',
            address: '1212',
            cardID: '1212',
            startDate: "2021-11-26T00:00:00.000Z",
            deleted: false,
            __v: 0
        },
    ]
}

const  listSackedEmployeeReducer = (state = listSackedEmployeeInitialState, action) => {
        switch (action.type) {
            case "GET_EMPLOYEE_SACKED":
                state.employees = action.employees;
                return state;
            case "DELETE_EMPLOYEE_SACKED":
                console.log("action", action);
                return {
                    employees: [...state.employees, action.data]
                };
            case "RETURN_TO_WORK":
            {
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

export default listSackedEmployeeReducer;