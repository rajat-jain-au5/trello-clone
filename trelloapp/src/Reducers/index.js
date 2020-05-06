import {combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {createStore } from 'redux';
import stateReducers from './stateReducers'

const rootReducers = combineReducers({
    lists:stateReducers
})



const store = createStore(rootReducers,applyMiddleware(thunk))
export default store