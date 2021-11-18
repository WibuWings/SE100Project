const objectEditShiftInitialState = {},
    objectEditShiftReducer = (state = objectEditShiftInitialState, action) => {
        switch (action.type) {
            case "OBJECT_EDIT_SHIFT":
                return action.data;
            default:
                return state
        }
    }

export default objectEditShiftReducer;