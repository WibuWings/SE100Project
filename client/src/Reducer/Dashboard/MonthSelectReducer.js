const monthSelectDashboardInitialState = 0,
monthSelectDashboard = (state = monthSelectDashboardInitialState, action) => {
        switch (action.type) {
            case "MONTH_SELECT_DASHBOARD":
                return action.typeDashboard;
            case "RESET_MONTH_SELECT_DASHBOARD":
                return 0
            default:
                return state
        }
    }
export default monthSelectDashboard;