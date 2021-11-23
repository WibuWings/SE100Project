const typeTimeDashboardInitialState = 'Weak',
typeTimeDashboard = (state = typeTimeDashboardInitialState, action) => {
        switch (action.type) {
            case "TYPE_TIME_DASHBOARD":
                return action.typeDashboard;
            case "RESET_TYPE_TIME_DASHBOARD":
                return "Weak"
            default:
                return state
        }
    }

export default typeTimeDashboard;