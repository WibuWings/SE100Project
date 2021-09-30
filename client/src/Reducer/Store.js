import loginStatusReducer from './LoginStatusReducer';

var redux = require('redux');

const allReducers = redux.combineReducers({
    loginStatus: loginStatusReducer,
})


var Store = redux.createStore(allReducers);

export default Store;