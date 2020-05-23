import {combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {createStore } from 'redux';
import stateReducers from './stateReducers'
import authReducers from './authReducers'
import boardReducer from './boardReducer';
const rootReducers = combineReducers({
    lists:stateReducers,
    auth:authReducers,
    board:boardReducer
})



const store = createStore(rootReducers,applyMiddleware(thunk))
export default store