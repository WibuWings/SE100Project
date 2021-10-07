import loginStatusReducer from './LoginStatusReducer';
import typeUserReducer from './TypeStatusReducer';

var redux = require('redux');

const allReducers = redux.combineReducers({
    loginStatus: loginStatusReducer,
    typeUser: typeUserReducer,
})


var Store = redux.createStore(allReducers);

export default Store;