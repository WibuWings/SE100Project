const typeHeaderDashboardInitialState = 'All',
typeHeaderDashboard = (state = typeHeaderDashboardInitialState, action) => {
        switch (action.type) {
            case "TYPE_HEADER_DASHBOARD":
                return action.typeDashboard;
            case "RESET_TYPE_HEADER_DASHBOARD":
                return "All"
            default:
                return state
        }
    }

export default typeHeaderDashboard;