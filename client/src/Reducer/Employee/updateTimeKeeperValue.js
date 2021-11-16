const updateTimeKeepingValueInitialState =
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
};

const updateTimeKeepingValueReducer = (state = updateTimeKeepingValueInitialState, action) => {
        switch (action.type) {
            case "SET_UPDATE_TIMEKEEPER_VALUE":
                return{
                    state: action.data
                }
            default:
                return state
        }
    }

export default updateTimeKeepingValueReducer;