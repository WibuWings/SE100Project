import loginStatusReducer from './LoginStatusReducer';
import typeUserReducer from './TypeStatusReducer';
import countryReducer from './ProvinceReducer';
import statusAddShiftReducer from './Status/StatusAddShiftReducer';
import infoUserReducer from './InfoUserReducer';
import listShiftReducer from './ListShiftReducer';
import statusEditShiftReducer from  './Status/StatusEditShiftReducer';
import objectEditShiftReducer from './ObjectEditShiftReducer';
var redux = require('redux');

const allReducers = redux.combineReducers({
    loginStatus: loginStatusReducer,
    typeUser: typeUserReducer,
    country: countryReducer,
    addStatus: statusAddShiftReducer,
    infoUser: infoUserReducer,
    listShift: listShiftReducer,
    editShiftStatus: statusEditShiftReducer,
    objectEditShift: objectEditShiftReducer,
})


var Store = redux.createStore(allReducers);

export default Store;