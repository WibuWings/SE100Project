import loginStatusReducer from './LoginStatusReducer';
import typeUserReducer from './TypeStatusReducer';
import countryReducer from './ProvinceReducer';
import districtReducer from './DistrictReducer';
import statusAddShiftReducer from './Status/StatusAddShiftReducer';
import infoUserReducer from './InfoUserReducer';
import listShiftReducer from './ListShiftReducer';
import statusEditShiftReducer from  './Status/StatusEditShiftReducer';
import objectEditShiftReducer from './ObjectEditShiftReducer';
import statusDarkmodeReducer from './Status/StatusDarkModeReducer';
import statusModalConfirmPasswordReducer from './Status/StatusModalConfirmPassword';
import statusConfirmReducer from './Status/StatusConfirmReducer';
import statusDeleteConfirmReducer from './Status/StatusDeleteConfirmReducer';
import statusUpdateGoodReducer from './Status/StatusUpdateGoodReducer';
import statusEditTypeReducer from './Status/StatusEditTypeReducer';
import statusAddTypeReducer from './Status/StatusAddTypeReducer';
import statusUpdateTypeReducer from './GoodManager/UpdateTypeStatus';
import roleReducer from './RoleReducer';
import confirmModalReducer from './ConfirmModalReducer';
import statusYesConfirmReducer from './Status/StatusYesConfirmReducer';
import statusAddEmployeeReducer from './Status/StatusAddEmployeeReducer';
import statusUpdateEmployeeReducer from './Status/StatusUpdateEmployeeReducer';
import statusPayEmployeeReducer from './Status/StatusPayMoneyStatus';
import listProductReducer from './ListProductReducer';
import typeProductReducer from './typeProductReducer';
import chooseTypeProductReducer from './chooseTypeProduct';
import typeProductValueReducer from './TypeProductValueReducer';
import infoGoodReducer from './InfoUpdateProduct';
import alertReducer from './AlertReducer';
import shoppingBagsReducer from './SellProduct/ShoppingBagsReducer';
import listEmployeeReducer from './Employee/employeeListReducer';
import currentEditEmployeeReducer from './Employee/currentEditEmployeeReducer';
import listSackedEmployeeReducer from './Employee/employeeSackedListReducer';
import statusShowHistoryReciept from './SellProduct/StatusShowHistoryRecieptReducer';
import listRecieptReducer from './SellProduct/ListRecieptReducer';
import statusEditInfomationBill from './SellProduct/StatusEditInfomationBill';
import InfomationBillEditReducer from './SellProduct/InfomationBillEdit';
import nextWeekTimeKeepingReducer from './Employee/nextWeekTimeKeepingReducer';
import statusAddNextWeekTimeKeepingReducer from './Employee/addNextWeekTimeKeepingStatus';
import statusUpdateNextWeekTimeKeepingReducer from './Employee/updateNextWeekTimeKeepingStatus';
import updateNextWeekTimeKeepingValueReducer from './Employee/updateNextWeekTimeKeepingValue';
import listShiftAssignReducer from './Employee/listShiftAssignReducer';
import listTimeKeepingReducer from './Employee/listTimeKeepingReducer';
import statusAddTimeKeepingReducer from './Employee/addTimeKeepingStatus';
import statusUpdateTimeKeepingReducer from './Employee/updateTimeKeepingStatus';
import updateTimeKeepingValueReducer from './Employee/updateTimeKeeperValue';
import typeRecieptReducer from './RecieptManager/TypeReciept';
import typeByDateReducer from './RecieptManager/TypeByDate';
import statusSelectAllReducer from './RecieptManager/StatusSelectAll'
import listRecieptDeleteReducer from './RecieptManager/ListRecieptDelete';
import searchReducer from './RecieptManager/SearchReducer';
import statusAddGoodReducer from './GoodManager/AddGoodStatus';
import currentEmployeeViewValueReducer from './Employee/currentEmployeeViewValue';
import typeTimeDashboard from './Dashboard/TypeTimeDashboard';
import typeHeaderDashboard from './Dashboard/TypeHeaderDashboard'
import monthSelectDashboard from './Dashboard/MonthSelectReducer';
import yearSelectDashboard from './Dashboard/YearSelectReducer';
import statusModalAddCouponReducer from './Profile/StatusModalAddCoupon';
import listCouponReducer from './Profile/ListCoupon';
import statusEditCouponReducer from './Profile/StatusEditCoupon';
import objectEditCouponReducer from './Profile/ObjectEditCoupon';
import regulationReducer from './Profile/RegulationReducer';
import sidebarOpenReducer from './SidebarOpenStatus';
import statusExcelInstructionReducer from './GoodManager/ExcelInstructionStatus';
import statusAddEmployeeToShiftReducer from './Employee/addEmployeeToShiftStatus';
var redux = require('redux');

const allReducers = redux.combineReducers({
    loginStatus: loginStatusReducer,
    typeUser: typeUserReducer,
    country: countryReducer,
    district: districtReducer,
    addStatus: statusAddShiftReducer,
    confirmStatus: statusConfirmReducer,
    deleteStatus: statusDeleteConfirmReducer,
    editTypeStatus: statusEditTypeReducer,
    addTypeStatus: statusAddTypeReducer,
    updateGoodStatus: statusUpdateGoodReducer,
    infoUpdate: infoGoodReducer,
    infoUser: infoUserReducer,
    listShift: listShiftReducer,
    role: roleReducer,
    confirmCode: confirmModalReducer,
    yesConfirm: statusYesConfirmReducer,
    // Nhân viên
    listEmployee: listEmployeeReducer,
    listSackedEmployee: listSackedEmployeeReducer,
    currentEditEmployee: currentEditEmployeeReducer, 
    addEmployeeStatus: statusAddEmployeeReducer,
    payEmployeeStatus: statusPayEmployeeReducer,
    updateEmpoyeeStatus: statusUpdateEmployeeReducer,
    currentEmployeeViewValue: currentEmployeeViewValueReducer,
    updateNextWeekTimeKeepingValue : updateNextWeekTimeKeepingValueReducer ,
    listShiftAssign: listShiftAssignReducer,
    listTimeKeeping: listTimeKeepingReducer,
    statusAddEmployeeToShift: statusAddEmployeeToShiftReducer,
    // Chấm công các kiểu
    nextWeekTimeKeeping: nextWeekTimeKeepingReducer,
    statusAddNextWeekTimeKeeping: statusAddNextWeekTimeKeepingReducer,
    statusUpdateNextWeekTimeKeeping: statusUpdateNextWeekTimeKeepingReducer,
    statusAddTimeKeeping: statusAddTimeKeepingReducer,
    statusUpdateTimeKeeping: statusUpdateTimeKeepingReducer,
    updateTimeKeepingValue: updateTimeKeepingValueReducer,
    //sidebar
    sidebarOpen: sidebarOpenReducer,
    //Quy định
    regulationReducer: regulationReducer,
    // Ca
    editShiftStatus: statusEditShiftReducer,
    objectEditShift: objectEditShiftReducer,
    statusDarkmode: statusDarkmodeReducer,
    statusConfirmPassword: statusModalConfirmPasswordReducer,
    //Hàng hoá
    statusAddGood: statusAddGoodReducer,
    typeProductValue: typeProductValueReducer,
    listProduct: listProductReducer,
    typeProduct: typeProductReducer,
    chooseTypeProduct: chooseTypeProductReducer,
    statusUpdateType: statusUpdateTypeReducer,
    alert: alertReducer,
    excelInstructionStatus: statusExcelInstructionReducer,
    //Hóa đơn
    shoppingBags: shoppingBagsReducer,
    statusShowHistoryReciept: statusShowHistoryReciept,
    listReciept: listRecieptReducer,
    statusEditInfoBill :statusEditInfomationBill,
    InfomationBillEdit : InfomationBillEditReducer,
    typeReciept: typeRecieptReducer,
    typeByDate: typeByDateReducer,
    statusSelectAll: statusSelectAllReducer,
    listRecieptDelete: listRecieptDeleteReducer,
    search: searchReducer,
    //Dashboard
    typeTimeDashboard: typeTimeDashboard,
    typeHeaderDashboard: typeHeaderDashboard,
    monthSelectDashboard: monthSelectDashboard,
    yearSelectDashboard: yearSelectDashboard,
    //Coupon
    statusModalAddCoupon: statusModalAddCouponReducer,
    listCoupon: listCouponReducer,
    statusEditCoupon: statusEditCouponReducer,
    objectEditCoupon: objectEditCouponReducer
})


var Store = redux.createStore(allReducers);

export default Store;