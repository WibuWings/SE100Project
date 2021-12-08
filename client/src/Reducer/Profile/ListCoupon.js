
const listCouponInitialState = [],
    listCouponReducer = (state = listCouponInitialState, action) => {
        switch (action.type) {
            case "DELETE_COUPON":
                return state.filter((value, key) => (value.idCoupon !== action.idCoupon));
            case "ADD_COUPON":
                return [...state, action.data]
            case "EDIT_COUPON":
                return state.map(value => {
                    if (value.idCoupon == action.data.idCoupon) {
                        value.name = action.data.name
                        value.percent = action.data.percent
                        value.minTotal = action.data.minTotal
                        value.timeFrom = action.data.timeFrom
                        value.timeEnd = action.data.timeEnd
                        value.quantity = action.data.quantity
                    }
                    return value
                })
            case "UPDATE_QUANTITY_COUPON":
                return state.map(value => {
                    if (value.idCoupon === action.idCoupon) {
                        value.quantity--
                    }
                    return value
                })
            case "UPDATE_COUPON_USER": 
                return state = action.coupons
            default:
                return state
        }
    }
    
export default listCouponReducer;