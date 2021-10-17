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
import statusConfirmReducer from './Status/StatusConfirmReducer';
import statusDeleteConfirmReducer from './Status/StatusDeleteConfirmReducer';
import statusUpdateGoodReducer from './Status/StatusUpdateGoodReducer';
import statusEditTypeReducer from './Status/StatusEditTypeReducer';
import statusAddTypeReducer from './Status/StatusAddTypeReducer';
import statusIsAddTypeReducer from './Status/StatusIsAddTypeReducer';
import statusModalConfirmPasswordReducer from './Status/StatusModalConfirmPassword';
import roleReducer from './RoleReducer';
import confirmModalReducer from './ConfirmModalReducer';
import statusYesConfirmReducer from './Status/StatusYesConfirmReducer';
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
    infoUser: infoUserReducer,
    listShift: listShiftReducer,
    role: roleReducer,
    confirmCode: confirmModalReducer,
    yesConfirm: statusYesConfirmReducer,
    editShiftStatus: statusEditShiftReducer,
    objectEditShift: objectEditShiftReducer,
    statusDarkmode: statusDarkmodeReducer,
    statusConfirmPassword: statusModalConfirmPasswordReducer,
})


var Store = redux.createStore(allReducers);

export default Store;