
const currentEditEmployeeInitialState =
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

    currentEditEmployeeReducer = (state = currentEditEmployeeInitialState, action) => {
        switch (action.type) {
            case "SET_UPDATE_EMPLOYEE":
                return{
                    state: action.data
                }
            default:
                return state
        }
    }

export default currentEditEmployeeReducer;