const StatusExcelInstructionInitialState = false;
const statusExcelInstructionReducer = (state = StatusExcelInstructionInitialState, action) => {
    switch(action.type) {
        case "CHANGE_EXCEL_INSTRUCTION_STATUS":
            return !state;
        default:
            return state
    }
}

export default statusExcelInstructionReducer;