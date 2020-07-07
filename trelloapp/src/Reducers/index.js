import {combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {createStore } from 'redux';
import stateReducers from './stateReducers'
import authReducers from './authReducers'
import boardReducer from './boardReducer';
import errorReducers from './errorReducers'
const rootReducers = combineReducers({
    lists:stateReducers,
    auth:authReducers,
    board:boardReducer,
    error:errorReducers
})



const store = createStore(rootReducers,applyMiddleware(thunk))
export default store