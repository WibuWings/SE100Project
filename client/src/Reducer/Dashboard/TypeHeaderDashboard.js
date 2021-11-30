const typeHeaderDashboardInitialState = 'All',
typeHeaderDashboard = (state = typeHeaderDashboardInitialState, action) => {
        switch (action.type) {
            case "TYPE_HEADER_DASHBOARD":
                return action.typeDashboard;
            default:
                return state
        }
    }

export default typeHeaderDashboard;