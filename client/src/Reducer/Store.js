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
import statusIsAddTypeReducer from './Status/StatusIsAddTypeReducer';
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
    isAddTypeStatus: statusIsAddTypeReducer,
    updateGoodStatus: statusUpdateGoodReducer,
    infoUpdate: infoGoodReducer,
    infoUser: infoUserReducer,
    listShift: listShiftReducer,
    role: roleReducer,
    confirmCode: confirmModalReducer,
    yesConfirm: statusYesConfirmReducer,
    addEmployeeStatus: statusAddEmployeeReducer,
    payEmployeeStatus: statusPayEmployeeReducer,
    updateEmpoyeeStatus: statusUpdateEmployeeReducer,
    editShiftStatus: statusEditShiftReducer,
    objectEditShift: objectEditShiftReducer,
    statusDarkmode: statusDarkmodeReducer,
    statusConfirmPassword: statusModalConfirmPasswordReducer,
    typeProductValue: typeProductValueReducer,
    listProduct: listProductReducer,
    typeProduct: typeProductReducer,
    chooseTypeProduct: chooseTypeProductReducer,
    alert: alertReducer,
    shoppingBags: shoppingBagsReducer,
})


var Store = redux.createStore(allReducers);

export default Store;