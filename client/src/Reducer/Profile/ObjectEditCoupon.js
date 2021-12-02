
const ObjectEditCouponInitialState = {},
objectEditCouponReducer = (state = ObjectEditCouponInitialState, action) => {
    switch (action.type) {
        case "OBJECT_EDIT_COUPON":
            return action.objectEditCoupon;
        default:
            return state
    }
}

export default objectEditCouponReducer;