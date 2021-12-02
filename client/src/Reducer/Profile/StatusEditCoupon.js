const StatusEditCouponInitialState = false,
statusEditCouponReducer = (state = StatusEditCouponInitialState, action) => {
    switch(action.type) {
        case "CHANGE_EDIT_COUPON_STATUS":
            return  !state; 
        case "RESET_EDIT_COUPON_STATUS":
            return false
        default:
            return state
    }
}

export default statusEditCouponReducer;