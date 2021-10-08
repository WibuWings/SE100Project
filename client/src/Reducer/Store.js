import loginStatusReducer from './LoginStatusReducer';
import typeUserReducer from './TypeStatusReducer';
import countryReducer from './ProvinceReducer';


var redux = require('redux');

const allReducers = redux.combineReducers({
    loginStatus: loginStatusReducer,
    typeUser: typeUserReducer,
    country: countryReducer,
})


var Store = redux.createStore(allReducers);

export default Store;