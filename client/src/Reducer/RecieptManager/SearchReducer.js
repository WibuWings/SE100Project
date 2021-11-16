const SearchInitialState = '',
    searchReducer = (state = SearchInitialState, action) => {
        switch (action.type) {
            case "CHANGE_SEARCH":
                return action.object;
            case "RESET_SEARCH":
                return state = '';
            default:
                return state
        }
    }

export default searchReducer;