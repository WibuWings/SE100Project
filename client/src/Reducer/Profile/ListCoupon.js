
const listCouponInitialState = [],
    listCouponReducer = (state = listCouponInitialState, action) => {
        switch (action.type) {
            case "DELETE_COUPON":
                return state.filter((value, key) => (value._id.couponID !== action.idCoupon));
            case "ADD_COUPON":
                return [...state, action.data]
            case "EDIT_COUPON":
                return state.map(value => {
                    if (value._id.couponID == action.data._id.couponID) {
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
                    if (value._id.couponID === action._id.couponID) {
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