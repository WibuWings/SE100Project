let nowTime = new Date()
const yearSelectDashboardInitialState = nowTime.getFullYear(),
yearSelectDashboard = (state = yearSelectDashboardInitialState, action) => {
        switch (action.type) {
            case "YEAR_SELECT_DASHBOARD":
                return action.typeDashboard;
                case "RESET_MONTH_SELECT_DASHBOARD":
                    return nowTime.getFullYear()
            default:
                return state
        }
    }
export default yearSelectDashboard;