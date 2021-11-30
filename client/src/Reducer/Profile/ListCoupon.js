
const listCouponInitialState = [],
listCouponReducer = (state = listCouponInitialState, action) => {
    switch (action.type) {
        case "DELETE_COUPON":
            return state.filter((value, key) => (value.idCoupon !== action.idCoupon));
        case "ADD_COUPON":
            return [...state, action.data]
        case "EDIT_COUPON":
            return state.map(value => {
                if(value.idCoupon == action.data.idCoupon) {
                    value.name = action.data.name
                    value.percent = action.data.percent
                    value.minTotal = action.data.minTotal
                    value.timeFrom = action.data.timeFrom
                    value.timeEnd = action.data.timeEnd
                    value.quantity = action.data.quantity
                }
                return value
            })
        // case "OBJECT_UPDATE_SHIFT":
        //     state.forEach(item => {
        //         if(item._id.shiftID === action.data.id) {
        //             item.name = action.data.description;
        //             item.salary = action.data.salary;
        //             item.timeFrom = action.data.from;
        //             item.timeEnd = action.data.to;
        //         }
        //     })
        //     return state
        default:
            return state
    }
}

export default listCouponReducer;