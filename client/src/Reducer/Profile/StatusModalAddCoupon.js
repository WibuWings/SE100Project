const StatusModalAddCouponInitialState = false,
statusModalAddCouponReducer = (state = StatusModalAddCouponInitialState, action) => {
    switch(action.type) {
        case "CHANGE_ADD_COUPON_STATUS":
            return  !state; 
        default:
            return state
    }
}

export default statusModalAddCouponReducer;